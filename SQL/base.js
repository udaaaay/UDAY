const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@UDAY@123s',
    database: 'myDataBase',
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, phone_number, password } = req.body;
        const sql = 'INSERT INTO users (name, email, phone_number, password) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [name, email, phone_number, password]);
        res.json({ message: 'User registered successfully!', userId: result.insertId });
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone_number, password } = req.body;
        const sql = 'UPDATE users SET name = ?, email = ?, phone_number = ?, password = ? WHERE id = ?';
        const [result] = await pool.execute(sql, [name, email, phone_number, password, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User updated successfully!' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await pool.execute(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json({ message: 'User deleted successfully!' });
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});