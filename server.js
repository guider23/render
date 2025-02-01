const express = require('express');
const cors = require('cors'); // Import cors
const mysql = require('mysql2'); // Import MySQL2
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
    host: 'autorack.proxy.rlwy.net',
    user: 'root', // Your database username
    password: 'PMaLOewnnJoVlgvZfihfDtwWJtURcNXf', // Your database password
    database: 'railway' // Your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected...');
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Fingerprint Registration API!');
});

// Endpoint to store fingerprint
app.post('/storeFingerprint', (req, res) => {
    console.log('Request Body:', req.body);  // Log the request body
    const { credential } = req.body;

    // Insert fingerprint data into the database
    const query = 'INSERT INTO fingerprints (fingerprint_data) VALUES (?)';
    db.query(query, [JSON.stringify(credential)], (error, results) => {
        if (error) {
            console.error('Error storing fingerprint:', error);
            return res.status(500).json({ message: 'Error storing fingerprint' });
        }
        res.json({ message: 'Fingerprint stored successfully' });
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
