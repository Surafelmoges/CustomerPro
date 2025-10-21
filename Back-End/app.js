const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3300, () => {
  console.log('Server is running on port 3300');
})


const createConnection = mysql.createConnection({
  host: 'localhost',
  user: 'AGB01',
  password: 'Welcome44',
  database: 'CustomerInfo'  
})
createConnection.connect((err) => {
  if(err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }


});
app.get('/', (req, res) => {
  res.send('Welcome to the Customer Information API');

  const createQuery = `CREATE TABLE IF NOT EXISTS customersA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    type VARCHAR(50)
  )`;

  createConnection.query(createQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created or already exists.');
    }
  });
});




