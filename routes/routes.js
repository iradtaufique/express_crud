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
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
  },
})

var upload = multer({
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


// Inserting user into Database
router.post('/add', upload, (req, res) =>{
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });
  user.save( (err) =>{
    if(err){
      res.json({message: err.message, type: 'danger'});
    }else{
      req.session.message = {
        type: 'success',
        message: 'User Added Succfully',
      };
      res.redirect('/');
    }
  });
});

module.exports = router;


