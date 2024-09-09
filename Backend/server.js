const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database credentials
const db = mysql.createConnection({
  host: 'junction.proxy.rlwy.net',
  user: 'root',
  password: 'PCcyAVniUrrgtxuXcLWQjGLAlIjXZWmP',
  database: 'railway',
  port: 41518
});

// Connect to MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO Users (username, email, password, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, phone], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      console.log('User inserted into database');
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'User not found or invalid credentials' });
    }

    res.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        reject(err);
      }
      if (result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
