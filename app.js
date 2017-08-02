//app.js is the launcher engine

var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
//the project knows that we gonna use ejs for our templates
app.set('view engine', 'ejs'); 

//static files
//middleware
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port and log
app.listen(3000);
console.log('You are listening to port 3000!');