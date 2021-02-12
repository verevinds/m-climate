const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
var busboy = require('connect-busboy');
var path = require('path');

mongoose.connect('mongodb://m-climate_mongo_1.m-climate_local:27017/');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('Connection Succeeded');
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

require('./router/post')(app);
require('./router/brand')(app);
require('./router/product')(app);
require('./router/files')(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
      console.log("Server is up and running on port number " + PORT);

});
