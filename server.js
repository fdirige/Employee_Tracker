//Express and MySQL requirements
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connection to databse
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Erick1988$',
        database: 'employees_db'
    },
    console.log(`Connected to the Employees databse.`)
);

module.exports = db;