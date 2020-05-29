const { resolve } = require('path')
const express = require('express');
const app = express();

const PORT = 3333 || process.env.PORT;

app.use(express.static(resolve('./static')));

app.listen(PORT, err => 
  err ? console.error(err) : console.log(`App is running on port: ${PORT}`))