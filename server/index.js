require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

// API routes can go here
app.get('/api/skills', (req, res) => {
    // In a real app this would query a DB
    res.json({ success: true, message: "Skills endpoint ready" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
