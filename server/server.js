// server.js
const express = require("express");
const db = require("./config/db"); // your MySQL connection
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // allow frontend to connect
app.use(express.json());

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

    res.status(201).json({ message: "User created", userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

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

    res.status(200).json({ message: "Sign in successful", userId: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/logout", (req, res) => {

  res.json({
    message: "Logout successful"
  });

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});