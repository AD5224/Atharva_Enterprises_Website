// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL root password
  database: 'atharva_enterprises'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Endpoint for handling contact form submissions
app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  const query = 'INSERT INTO contact_requests (name, email, message, timestamp) VALUES (?, ?, ?, NOW())';

  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).send('Failed to save contact request.');
    } else {
      res.status(200).send('Contact request submitted successfully.');
    }
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
