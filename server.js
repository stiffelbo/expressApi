const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');

// import routes
const testimonialRoutes = require('./routes/testimonial.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

//use in app
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

//not valid endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect('mongodb+srv://stiffelbo:stifelboMongo123@cluster0.vgspf.mongodb.net/newWaveDb?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

//runserver on port 8000
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on Port:', 8000)
});

//web sockets
const io = socket(server);
io.on('connection', (socket) => {
  socket.on('disconnect', () => { 
    const id = socket.id;
    console.log('disconected: ', id);
  });
  console.log(`Server.js new client connected: ${socket.id}`);
});

