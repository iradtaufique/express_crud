// imports
require('dotenv').config(); // for loading file in .env
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 4000; // getting port from .env


// database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database'))

// routes for testing
app.get('/', (req, res) =>{
    res.send('Hello There!!');
});

app.listen(PORT, () =>{
    console.log(`Server started on http://locahost:${PORT}`);
});
