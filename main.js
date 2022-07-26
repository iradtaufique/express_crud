// imports
require('dotenv').config(); // for loading file in .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


// database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log('Connected to the database'))

const app = express();
const PORT = process.env.PORT || 4000; // getting port from .env


// Middleware Configurations
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(
    session({
        secret: 'my secret key',
        saveUninitialized: true,
        resave: false
    })
);

app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message,
    next();
});

// set Template Engine
app.set('view engine', 'ejs');


// setting uploads as static file
app.use(express.static('uploads'));


// routes for testing
app.use("", require('./routes/routes'));

app.listen(PORT, () =>{
    console.log(`Server started on http://localhost:${PORT}`);
});
