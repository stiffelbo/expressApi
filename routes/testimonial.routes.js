const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);  
});

// get random testimonial
router.route('/testimonials/random').get((req, res) => {  
  res.json(db.testimonials[Math.floor(Math.random() * db.length)]);    
});

// get testimonial by :id
router.route('/testimonials/:id').get((req, res) => {
  const id = req.url.replace('/testimonials/',''); 
  const response = db.testimonials.filter((elem)=>{return elem.id == id}).length ? db.testimonials.filter((elem)=>{return elem.id == id})[0] : {'err': `no such entitiy ${id}`};
  res.json(response);  
});

// post new testimonial with random id
router.route('/testimonials/').post((req, res) => {  
  const newAuthor = req.body.author;
  const newText = req.body.text;
  const newId = uuid.v4();  
  db.testimonials.push({'id' : newId, 'author' : newAuthor, 'text' : newText});
  res.json({'id' : newId, 'author' : newAuthor, 'text' : newText});     
});

//update testimonial by :id
router.route('/testimonials/:id').post((req, res) => {
  const id = req.url.replace('/testimonials/',''); 
  const newAuthor = req.body.author;
  const newText = req.body.text;  
  db.testimonials.forEach(val =>{
    if(val.id == id) {
      val.author = newAuthor;
      val.text = newText;
      res.json({'author' : val.author, 'text' : val.text});
    } 
  });
});
//delete testimonial by :id
router.route('/testimonials/:id').delete((req, res) => {
  const id = req.url.replace('/testimonials/','');   
  db.testimonials.forEach((val, index) =>{
    if(val.id == id) {
      db.testimonials.splice(index, 1);      
      res.json({ 'delete' : `item with index: ${index}`, "id": id});
    } 
  });
});


module.exports = router;