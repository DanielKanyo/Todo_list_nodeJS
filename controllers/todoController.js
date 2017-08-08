//the todo list controller

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // use native mongoose promises

//Connect to database - old version
//mongoose.connect('mongodb://daniel:daniel@ds129532.mlab.com:29532/todo');

//Connect to database
mongoose.connect('mongodb://daniel:daniel@ds129532.mlab.com:29532/todo', {
  useMongoClient: true,
});

//Create the schema - this is like blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{ item: 'get milk'},{item: 'walk dog'},{item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  //GET
  app.get('/todo', function (req, res) {
    //get data from mongoDB and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  //POST
  app.post('/todo', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongoDB
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  //DELETE
  app.delete('/todo/:item', function (req, res) {
    //delete the requested item from mongoDB
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

};