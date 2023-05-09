const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const path = require ('path');
const fs = require('fs');

const app = express();
const db = process.env.DATABASE_URI;
const PORT = process.env.PORT || 3000;

//Connect to Databas
connectDB(db);

//Middleware
app.use(cors());

app.options("*", (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-Width');
    res.send(200);
});

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public')));
//
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

//Routes

app.use('/', require('./routes/api/states'));
app.use('/', require('./routes/api/stateCode'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

