// server.js
const express = require("express");
const db = require("./config/db"); // your MySQL connection
const bcrypt = require("bcrypt");
const cors = require("cors");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:2000", // your React port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

// POST signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const [result] = await db.query(
      "INSERT INTO signup (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Your account has been created successfully", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const [rows] = await db.query("SELECT * FROM signup WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let token;
    if (rememberMe) {
    token = generateToken();
    await db.query("UPDATE signup SET remember_token=? WHERE email=?", [token, email]);
    res.cookie("rememberToken", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });
    }

    res.status(200).json({ message: "Sign in successful", userId: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});
app.post("/logout", async (req, res) => {
  const token = req.cookies.rememberToken;
  if (token) {
    await db.query("UPDATE signup SET remember_token=NULL WHERE remember_token=?", [token]);
    res.clearCookie("rememberToken");
  }
  res.json({ message: "Logout successful" });
});

// auto-login route
app.get("/auto-login", async (req, res) => {
  const token = req.cookies.rememberToken;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const [rows] = await db.query("SELECT * FROM signup WHERE remember_token=?", [token]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid token" });
    const user = rows[0];
    res.status(200).json({ userId: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/forgot-password", async (req,res)=>{
    
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message:"Email required"});
    }

    try{

        const [rows] = await db.query(
            "SELECT * FROM signup WHERE email=?",
            [email]
        );

        if(rows.length===0){
            return res.status(404).json({
                message:"Email not found"
            });
        }

        const resetToken = generateToken();

        await db.query(
        "UPDATE signup SET reset_token=? WHERE email=?",
        [resetToken,email]
        );

        res.json({
            message:"Reset link generated",
            token:resetToken
        });

    }
    catch(err){
        res.status(500).json({
            message:"Server error"
        });
    }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});