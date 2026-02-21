const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'super_secret_key_for_testing';

app.use(cors());
app.use(bodyParser.json());

// Mock user database
const users = [
    {
        username: 'admin',
        password: bcrypt.hashSync('password123', 10)
    }
];

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Boundary check: Empty fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Boundary check: Length (example)
    if (username.length > 50 || password.length > 50) {
        return res.status(400).json({ message: 'Inputs are too long' });
    }

    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Signup route
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username.length > 50 || password.length > 50) {
        return res.status(400).json({ message: 'Inputs are too long' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
        });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = {
        username,
        password: bcrypt.hashSync(password, 10)
    };

    users.push(newUser);

    const token = jwt.sign({ username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(201).json({ message: 'User created successfully', token });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
