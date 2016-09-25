var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = 8081

var mongoose = require('mongoose');
var mongo_address = "127.0.0.1";
mongoose.connect(mongo_address);

// Configure middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'm1qewbBd2E'
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/smartDashfinalapp/index.html');
});
app.use('/', express.static(__dirname + '/smartDashfinalapp/'));

var user = require('./routes/user');
app.use('/api/user', user);

var goal = require('./routes/creategoal');
app.use('/api/goal', goal);

var progress = require('./routes/progress');
app.use('/api/progress', progress);

var breakdown = require('./routes/breakdown');
app.use('/api/breakdown', breakdown);

app.listen(port);
console.log('API running on port ' + port);
