const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

require('./router/post')(app);
require('./router/brand')(app);

// app.get('/users', (req, res) => {
//     User.find({}, function(err, user){

//         if(err) return console.log(err);
//         res.send(user)
//     });
//   })

// app.post('/users', (req, res) => {

//     if(!req.body) return res.sendStatus(400);

//     const name = req.body.name;
//     const user = new User({name});

//     user.save(function(err){
//         if(err) return console.log(err);
//         res.send(user);
//     });
// })
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
      console.log("Server is up and running on port number " + PORT);

});
