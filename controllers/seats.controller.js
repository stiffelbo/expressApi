const Seat = require('../models/Seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message : err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Seat.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
};

exports.getById = async (req, res) => {
  try {    
    const result = await Seat.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(dep);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.postOne = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    //data validation skipped...:(
    
    //check is seat is booked:
    const result = await Seat.find({ day, seat });    
    if(result.length){
      res.status(404).json({ message: "The slot is already taken..." });
    }else{
      const newDoc = new Seat({ day, seat, client, email });
      await newDoc.save();
      res.json(newDoc);
      //web sockets
      const io = req.io;
      const seats = await Seat.find();
      io.emit('seatsUpdated', seats);
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { day, seat, client, email } = req.body;
  //check if seat can be updated
  const result = await Seat.find({ day, seat });
    if(result){
      res.status(404).json({ message: "The slot is already taken..." });
    }else{
      try {
        const result = await Seat.findById(req.params.id);
        if(result){
          await Seat.updateOne({_id: req.params.id}, {$set: { day, seat, client, email }});
          const updated = await Seat.findById(req.params.id);
          res.json(updated);
        }
        else res.status(404).json({message: 'Not found'});
      } catch (err) {
        res.status(500).json({message: err});
      }
    }  
};

exports.deteleById = async (req, res) => {  
  try {
    const result = await Seat.findById(req.params.id);
    if(result){
      await Seat.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};