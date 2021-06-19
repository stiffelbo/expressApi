const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message : err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Testimonial.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
};

exports.getById = async (req, res) => {
  try {    
    const result = await Testimonial.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(dep);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.postOne = async (req, res) => {
  try {
    const { author, text } = req.body;   
    const newDoc = new Testimonial({ author, text });
    await newDoc.save();
    res.json(newDoc);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { id, author, text } = req.body;
  try {
    const result = await Testimonial.findById(req.params.id);
    if(result){
      await Testimonial.updateOne({_id: req.params.id}, {$set: {author, text}});
      const updated = await Testimonial.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};

exports.deteleById = async (req, res) => {  
  try {
    const result = await Testimonial.findById(req.params.id);
    if(result){
      await Testimonial.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};