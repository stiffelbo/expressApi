const express = require('express');
const app = express();
const cors = require('cors');

// import routes
const testimonialRoutes = require('./routes/testimonial.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

//use in app
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', testimonialRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

//not valid endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

//runserver on port 8000
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});