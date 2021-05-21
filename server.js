const express = require('express');
const path = require('path');

const app = express();

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});