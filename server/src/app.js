const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/');
var db = mongoose.connection;
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
app.listen(process.env.PORT || 8081);
