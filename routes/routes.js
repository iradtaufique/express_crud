const express = require("express");
const router = express.Router();
const multer = require('multer');
const User = require('../models/users');
const fs = require('fs');
const path = require("path");


// Image Upload
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
})

var upload = multer({
  storage: storage
}).single('image');


// HomePage Router or Gettign all users
router.get("/", (req, res) => {
  User.find().exec((err, users) =>{
    if (err){
      res.json({message: err.message})
    }else{
      res.render('index', {
        title: 'Home Page',
        users: users
      });
    }
  })
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


//  Getting User to be Edited
router.get('/edit/:id', (req, res) =>{
  let id = req.params.id
  User.findById(id, (err, user) =>{
    if(err){
      res.redirect('/');
    }else{
      if(user == null){
        res.redirect('/');
      }else{
        res.render('edit_user', {
          title: 'Edit User',
          user: user
        })
      }
    }
  })
});


// Post request to update user
router.post('/update/:id', upload, (req, res) =>{
  let id = req.params.id;
  let new_image = '';

  if (req.file){
    new_image = req.file.filename;
    // delete old_image form path
    try{
      fs.unlinkSync("./uploads/" + req.body.old_image);
    
    }catch(err){
      console.log(err);
    }
  }else{
    // user old_image was not changed
    new_image = req.body.old_image;
  }
  User.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: new_image,
  },
  (err, result) =>{
    if(err){
      res.json({message: err.message, type: 'danger'})
    }else{
      req.session.message = {
        type: 'success',
        message: 'User Updated Successfully'
      };
      res.redirect('/');
    }
  })
})


// Delete user route
router.get('/delete/:id', (req, res) =>{
  let id = req.params.id;
  let names = this.name
  User.findByIdAndRemove(id, (err, result) =>{
    if (result.image != ''){
      try{
        fs.unlinkSync('./uploads/' + result.image);
      }catch (err){
         console.log(err);
      }
    }

    if (err){
      res.json({message: err.message});
    }else{
      req.session.message = {
        type: 'info',
        message: `User Deleted Successfuly`
      };
      res.redirect('/');
    }

  })
})

module.exports = router;


