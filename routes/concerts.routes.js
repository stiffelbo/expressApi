const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);  
});

// get consert by :id
router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id; 
  const response = db.concerts.filter((elem)=>{return elem.id == id}).length ? db.concerts.filter((elem)=>{return elem.id == id})[0] : {'err': `no such entitiy ${id}`};
  res.json(response);  
});

// post new consert with random id
router.route('/concerts/').post((req, res) => {  
  const performer = req.body.performer;
  const genre = req.body.genre;
  const price = req.body.price;
  const day = req.body.day;
  const image = req.body.image;
  const newId = uuid.v4();
  const entry = {'id' : newId, 'performer' : performer, 'genre' : genre, 'price' : price, 'day' : day, "image" : image};  
  db.concerts.push(entry);
  res.json(entry);     
});

//update concert by :id
router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id; 
  const performer = req.body.performer;
  const genre = req.body.genre;
  const price = req.body.price;
  const day = req.body.day;
  const image = req.body.image;  
  db.concerts.forEach(val =>{
    if(val.id == id) {
      val.performer = performer;
      val.genre = genre;
      val.price = price;
      val.day = day;
      val.image = image;
      const entry = {'performer' : performer, 'genre' : genre, 'price' : price, 'day' : day, "image" : image};
      res.json(entry);
    } 
  });
});

//delete concert by :id
router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;   
  db.concerts.forEach((val, index) =>{
    if(val.id == id) {
      db.concerts.splice(index, 1);      
      res.json({ 'delete' : `item with index: ${index}`, "id": id});
    } 
  });
});

module.exports = router;