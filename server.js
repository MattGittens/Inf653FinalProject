const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const path = require ('path');
const fs = require('fs');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler.js');
const { logger } = require('./middleware/logEvents');





const app = express();
const db = process.env.DATABASE_URI;
const PORT = process.env.PORT || 3000;

//Connect to Databas
connectDB(db);

//Middleware
app.use(logger);

app.use(cors(corsOptions));
app.use(express.json());

//Static Files
app.use('/', express.static(path.join(__dirname, '/public')));
//
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

//Routes

app.use('/', require('./routes/api/states'));
app.use('/', require('./routes/api/stateCode'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});