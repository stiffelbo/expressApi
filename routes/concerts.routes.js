const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);  
});

// get concert by :id
router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id; 
  const filter = db.concerts.filter((elem)=>{return elem.id == id});
  const response = filter.length ? filter[0] : {'err': `no such entitiy ${id}`};  
  res.status(200).json(response);  
});

// post new concert with random id
router.route('/concerts/').post((req, res) => {
  const entry = {
    performer : req.body.performer,
    genre : req.body.genre,
    price : req.body.price,
    day : req.body.day,
    image : req.body.image,
    id : uuid.v4(),
  };
  db.concerts.push(entry);
  res.status(200).json(entry);     
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
      res.status(200).json(val);
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