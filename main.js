// imports
require('dotenv').config(); // for loading file in .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 4000; // getting port from .env

// routes for testing
app.get('/', (req, res) =>{
    res.send('Hello There!!');
});

app.listen(PORT, () =>{
    console.log(`Server started on http://locahost:${PORT}`);
});
