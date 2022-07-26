const express = require("express");
const router = express.Router();
const multer = require('multer')
const User = require('../models/users')


// Image Upload
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, file.filename + '_' + Date.now() + '_' + file.originalname)
  },
})

var Upload = multer({
  storage: storage
}).single('image');


// HomePage Router
router.get("/", (req, res) => {
  res.render('index', {title: 'Home Page'});
});


// Adding Users Router
router.get('/add', (req, res) =>{
  res.render('add_users', {title: 'Add Users Page'})
})

module.exports = router;


