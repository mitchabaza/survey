var express = require('express');
var router = express.Router();
var util = require("util")
// our db model
var levelup = require('levelup')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.


var db = levelup('./survey', {valueEncoding:'json'})
var Models = require('level-orm');

function Questions(db) {
    // users is the sublevel name to user
    // handle is the primary key to user for insertion
    Models.call(this, { db: db }, 'questions', 'handle');
}
util.inherits(Questions, Models);

var questions = new Questions(db);

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res) {
  

  // respond with json data
  res.json({status:
      "OK"
  })
});

// simple route to show an HTML page
router.get('/sample-page', function(req,res){
  res.render('sample.html')
})

// /**
//  * POST '/api/create'
//  * Receives a POST request of the new user and location, saves to db, responds back
//  * @param  {Object} req. An object containing the different attributes of the Person
//  * @return {Object} JSON
//  */

router.post('/api/create', function(req, res){

    console.log(req.body);

     questions.save(req.body,
        function (err, id) {
            // id will be the primary key
        });

    questions.get()
    return;
// 2) put a key & value
        db.put('surveyanswer',req.body, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error

        // 3) fetch by key
        db.get('surveyanswer', function (err, value) {
            if (err) return console.log('Ooops!', err) // likely the key was not found

            // ta da!
            return res.json(value);
        })
    })

    // })
});

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the animal to get
//  * @param  {String} req.param('id'). The animalId
//  * @return {Object} JSON
//  */

router.get('/api/get/:id', function(req, res){

  var requestedId = req.param('id');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Animal.findById(requestedId, function(err,data){

    // if err or no user found, respond with error 
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that animal'};
       return res.json(error);
    }

    // otherwise respond with JSON data of the animal
    var jsonData = {
      status: 'OK',
      animal: data
    }

    return res.json(jsonData);
  
  })
})

// /**
//  * GET '/api/get'
//  * Receives a GET request to get all animal details
//  * @return {Object} JSON
//  */

router.get('/api/get', function(req, res){

    db.get('surveyanswer', function (err, value) {
        if (err) return console.log('Ooops!', err) // likely the key was not found
        console.log(JSON.stringify(value))
        // ta da!
        return res.json(value);
    })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the animal to update, updates db, responds back
//  * @param  {String} req.param('id'). The animalId to update
//  * @param  {Object} req. An object containing the different attributes of the Animal
//  * @return {Object} JSON
//  */


module.exports = router;