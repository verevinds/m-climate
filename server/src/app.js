const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

global.__basedir = __dirname;

mongoose.connect('mongodb://mongo:27017/');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connection Succeeded');
});

const app = express();
app.use(express.static(path.resolve('./public/')));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(upload());

require('./router/post')(app);
require('./router/brand')(app);
require('./router/product')(app);
require('./router/files')(app);
require('./router/banners')(app);
require('./router/service')(app);
require('./router/geo')(app);
require('./router/portfolio')(app);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});
