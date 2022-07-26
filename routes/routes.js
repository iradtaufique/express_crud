const express = require("express");
const router = express.Router();


// HomePage Router
router.get("/", (req, res) => {
  res.render('index', {title: 'Home Page'});
});


// Adding Users Router
router.get('/add', (req, res) =>{
  res.render('add_users', {title: 'Add Users Page'})
})

module.exports = router;


