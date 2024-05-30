const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();


// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

      const sql = 'INSERT INTO Users (username, email, password, phone) VALUES (?, ?, ?, ?)';
      db.query(sql, [username, email, password, phone], (err, result) => {
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
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database to find the user with the provided email and password
    const sql = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Check if user was found
        if (result.length === 0) {
            return res.status(404).json({ message: 'User not found or invalid credentials' });
        }

        // User found, return user data
        const user = result[0];
        res.json({ id: user.id, email: user.email });
    });
});

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE email = ?';
      db.query(sql, email, (err, result) => {
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
