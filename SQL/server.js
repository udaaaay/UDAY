import mysql from 'mysql2'

// const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'UDAY@123s',
    database: 'myDataBase'
    });
    connection.connect((err) =>{
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL Database');
    })