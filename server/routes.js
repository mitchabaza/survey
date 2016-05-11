var express = require('express');
var router = express.Router();


var datastore = require('nedb'),
    questionsDb = new datastore({filename: '../db/questions', autoload: true}),
    answersDb = new datastore({filename: '../db/answers', autoload: true});

var questions = [
    {
        text: 'How many people live in your household?',
        id: 1,
        answers: [
            {text: "1", value: 1},
            {text: "2", value: 2},
            {text: "3", value: 3},
            {text: "4 or more", value: 4}
        ]
    },
    {
        text: 'Are you considering buying a car in the next six months?',
        id: 2,
        answers: [
            {text: "Yes", value: 1},
            {text: "No", value: 2}
        ]
    },
    {
        text: 'Which of the following presidential candidates would you consider voting for in 2016?',
        id: 3,
        answers: [
            {text: "Bozo The Clown", value: 1},
            {text: "CaveMan from the Geico Commercial", value: 2},
            {text: "Aaron Rodgers", value: 3}
        ]
    }
];
for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    questionsDb.update({id: question.id}, question, {upsert: true});
}


router.get('/api', function (req, res) {


    // respond with json data
    res.json({
        status: "OK"
    })
});



router.get('/api/questions/get', function (req, res) {


    questionsDb.find({}, function (err, docs) {
        return res.json(docs);
    });


});
router.post('/api/answers/:questionId/add', function (req, res) {
    var answer = {questionId: req.params.questionId, value: req.body.value, timestamp: new Date()}
    answersDb.insert(answer, function (err, docs) {
        return res.json(docs);
    });


});


router.get('/api/answers/:questionId/get', function (req, res) {

    var requestedId = req.params.questionId;

    answersDb.find({questionId:requestedId}, function (err, docs) {
        return res.json(docs);
    });
});
router.get('/api/answers/:questionId/get', function (req, res) {

    var requestedId = req.params.questionId;

    answersDb.find({questionId:requestedId}, function (err, docs) {
        return res.json(docs);
    });
 });

module.exports = router;