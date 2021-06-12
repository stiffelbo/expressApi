const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');
const { seats } = require('../db');

// get all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);  
});

// get seat by :id
router.route('/seats/:id').get((req, res) => {
  const id = req.params.id; 
  const filter = db.seats.filter((elem)=>{return elem.id == id});
  if(filter.length){
    res.status(200).json(filter[0]);
  }else{
    res.status(404).json({'err': `no such entitiy ${id}`});
  }
});

// post new seat with random id
router.route('/seats/').post((req, res) => {  
  const entry = {
    client: req.body.client,
    seat: req.body.seat,
    email: req.body.email,
    day: req.body.day,
    id : uuid.v4(),
  };
  
  //data validation flag
  let properRequest = true;
  //error message
  const err = {    
    "ERR_missingFields" : [],
  };
  //data validation (empty fields)
  for (const [key, val] of Object.entries(entry)){
    if(!val){
      err['ERR_missingFields'].push(key);
      properRequest = false;
    }
  }
  //execute entry and respond or send err message
  if(properRequest){
    //check if seat is empty
    const isBooked = db.seats.some(seat => {
      if(seat.day == entry.day && seat.seat == entry.seat){        
        return true;
      } 
    });
    if(isBooked){
      res.status(404).json({ message: "The slot is already taken..." });
    }else{
      db.seats.push(entry);
      res.status(200).json(entry);
    }
  }else{
    res.status(406).json(err);
  }      
});

//update seat by :id
router.route('/seats/:id').put((req, res) => {
  const entry = {
    id : req.params.id, 
    client : req.body.client,
    seat : req.body.seat,
    email : req.body.email,
    day : req.body.day, 
  }
  //data validation flag
  let properRequest = true;
  //error message
  let err = {    
    "ERR_missingFields" : [],
  };
  //data validation (empty fields)
  for (const [key, val] of Object.entries(entry)){
    if(!val){
      err['ERR_missingFields'].push(key);
      properRequest = false;
    }
  }
  //send err message not valid data
  if(!properRequest){    
    res.status(406).json(err);
  }else{
  //valid data, look for element to update
    let foundId = false;
    db.seats.forEach(val =>{            
      if(val.id == entry.id) {
        //element found -> update
        val.client = entry.client;
        val.seat = entry.seat;
        val.email = entry.email;
        val.day = entry.day;
        foundId = true;             
        res.status(200).json(val);
      }
    });
    //element not found -> sed err 404
    if(!foundId) res.status(404).json({'err': `no such entitiy ${entry.id}`});
  }   
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