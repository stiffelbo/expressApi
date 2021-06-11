const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);  
});

// get seat by :id
router.route('/seats/:id').get((req, res) => {
  const id = req.params.id; 
  const response = db.seats.filter((elem)=>{return elem.id == id}).length ? db.seats.filter((elem)=>{return elem.id == id})[0] : {'err': `no such entitiy ${id}`};
  res.status(200).json(response);
});

// post new seat with random id
router.route('/seats/').post((req, res) => {  
  const client = req.body.client;
  const seat = req.body.seat;
  const email = req.body.email;
  const day = req.body.day;
  const newId = uuid.v4();
  const entry = {'id' : newId, 'client' : client, 'seat' : seat, 'email' : email, 'day' : day};  
  db.seats.push(entry);
  res.status(200).json(entry);     
});

//update seat by :id
router.route('/seats/:id').put((req, res) => {
  const id = req.params.id; 
  const client = req.body.client;
  const seat = req.body.seat;
  const email = req.body.email;
  const day = req.body.day; 
  db.seats.forEach(val =>{
    if(val.id == id) {
      val.client = client;
      val.seat = seat;
      val.email = email;
      val.day = day;
      const entry = {'client' : client, 'seat' : seat, 'email' : email, 'day' : day};
      res.status(200).json(entry);
    } 
  });
});

//delete seat by :id
router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;   
  db.seats.forEach((val, index) =>{
    if(val.id == id) {
      db.seats.splice(index, 1);      
      res.status(200).json({ 'delete' : `item with index: ${index}`, "id": id});
    } 
  });
});

module.exports = router;