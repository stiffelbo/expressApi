const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message : err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Concert.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
};

exports.getById = async (req, res) => {
  try {    
    const result = await Concert.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.getByPerformer = async (req, res) => {
  try {    
    const result = await Concert.find({performer: req.params.performer});
    if(!result.length) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.getByGenre = async (req, res) => {
  try {    
    const result = await Concert.find({genre: req.params.genre});
    if(!result.length) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.getByPrices = async (req, res) => {
  try {    
    const result = await Concert.find({price: {$gte: req.params.price_min, $lte: req.params.price_max}});
    if(!result.length) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}
exports.getByDay = async (req, res) => {
  try {    
    const result = await Concert.find({day: req.params.day});
    if(!result.length) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.postOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newDoc = new Concert({ performer, genre, price, day, image });
    await newDoc.save();
    res.json(newDoc);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const result = await Concert.findById(req.params.id);
    if(result){
      await Concert.updateOne({_id: req.params.id}, {$set: { performer, genre, price, day, image }});
      const updated = await Concert.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};

exports.deteleById = async (req, res) => {  
  try {
    const result = await Concert.findById(req.params.id);
    if(result){
      await Concert.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};