const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'AGB01',
  password: 'Welcome44',
  database: 'CustomerInfo'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL.');

  const createQuery = `CREATE TABLE IF NOT EXISTS customersA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(50),
    address VARCHAR(255),
    type VARCHAR(50)
  )`;

  db.query(createQuery, (err) => {
    if (err) console.error('Error creating table:', err);
    else console.log('Table created or already exists.');
  });
});

app.post('/add-customer', (req, res) => {
  console.log('Received POST request:', req.body);
  const { fullName, email, phone, address, type } = req.body;
  const insertQuery = 'INSERT INTO customersA (name,email,phone,address,type) VALUES (?,?,?,?,?)';
  db.query(insertQuery, [fullName, email, phone, address, type], (err, results) => {
    if (err) {
      console.error('Error inserting customer:', err);
      return res.status(500).send('Error inserting customer');
    }
    console.log('Customer inserted successfully, id=', results.insertId);
    res.status(200).send('Customer inserted successfully.');
  });
});

const PORT = 3300;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));