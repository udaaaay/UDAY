import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hi");
});
const users = [
    { username: 'exuser', password: 'password123', email: 'exuser@gmail.com'}
];
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Received credentials - Username: ${username}, Password: ${password}');

    const user = users.find(
        user => user.username === username && user.password === password
    );

    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'Username or email already exists' });
    }

    users.push({ username, password, email });
    console.log('New user registered - Username: ${username}, Email: ${email}');
    res.status(201).json({ message: 'User registered successfully' });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});