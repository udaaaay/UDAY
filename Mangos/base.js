import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import test from './frontend2.js';
import jwt from 'jsonwebtoken';
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors({
    origin: 'https://uday-o0eg.onrender.com',
    credentials: true,
  }));
app.use(express.json());
// mongoose.connect(mongo_url);
mongoose.connect(process.env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Database connection error:', err));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
function authenticateToken(req, res, next) {
    const token = req.headers[authorization];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'zxcvbnm', (err,user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
   
    try {
        const { username, password } = req.body;
        const user = await test.findOne({ username });        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }else{
            const token = jwt.sign({ username: user.username }, 'zxcvbnm', { expiresIn: '30s' });
            res.status(200).json({ message: 'Login successful', user });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password, email, phone_number } = req.body;
        const newTest = new test({ username, password, email, phone_number });
        await newTest.save();
        res.status(201).json({ message: 'User registered successfully', user: newTest });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate entry detected. Please use unique values.' });
        }
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await test.find();
        res.json(users)
    } catch (error) {
        res.json('error')
    }
});
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, phone_number, password } = req.body;
    try {
        const updatedUser = await test.findByIdAndUpdate(id,
            { username, email, phone_number, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error('Error during update:', error);
        res.status(500).json({ error: 'An error occurred during the update.' });
    }
});
app.delete('/delete', async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await test.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        await test.findOneAndDelete({ username });
        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ error: 'An error occurred during deletion.' });
    }
});


// const express = require('express');
// const mongoose = require('mongoose');
// const testschema = require('mschema.js');
// const app = express();

// const mongo_url="mongodb://localhost:27017/";
// mongoose.connect(mongo_url)
// app.listen(6000, () => {
//     console.log(Server running);
// });
// app.post('\register', async(req,res) => {
//     const {name, age} = req.body;
//     const Test = new test({name, age});
//     await Test.save();
//     res.json({name, age});
// })