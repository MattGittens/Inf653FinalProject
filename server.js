const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const path = require ('path');
const fs = require('fs');
const corsOptions = require('./config/corsOptions');

const app = express();
const db = process.env.DATABASE_URI;
const PORT = process.env.PORT || 3000;

//Connect to Databas
connectDB(db);

//Middleware


app.use(cors(corsOptions));
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

