var express = require('express');
var router = express.Router();
var path = require('path');


var datastore = require('nedb'),
    questionsDb = new datastore({filename: './db/questions', autoload: true}),
    answersDb = new datastore({filename: './db/answers', autoload: true});

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
            {text: "No", value: 2},
            {text: "Maybe", value: 3},
            {text: "None of your business", value: 4}

        ]
    },
    {
        text: 'Which of the following presidential candidates would you consider voting for in 2016?',
        id: 3,
        answers: [
            {text: "Bozo The Clown", value: 1},
            {text: "The Geico Commercial Caveman", value: 2},
            {text: "Aaron Rodgers", value: 3}
        ]
    },
    {
        text: 'What\'s your favorite type of music?',
        id: 4,
        answers: [
            {text: "Death Metal", value: 1},
            {text: "Hip Hop", value: 2},
            {text: "Indie Rock", value: 3},
            {text: "Michael Bolton", value: 4}
        ]
    },
    {
        text: 'What is the highest degree or level of school you have completed?',
        id: 5,
        answers: [
            {text: "High school graduate", value: 2},
            {text: "Associate degree", value: 5},
            {text: "Bachelor’s degree", value: 6},
            {text: "Master’s degree", value: 7},
            {text: "Doctorate ", value: 8},
            {text: "SeaOrg", value: 8}

        ]
    },
    {
        text: 'Which of the following people would you consider voting for in the 2016 presidential election?',
        id: 6,
        answers: [
            {text: "Bozo The Clown", value: 1},
            {text: "The Geico Commercial Caveman", value: 2},
            {text: "Aaron Rodgers", value: 3},
            
        ]
    }
];
for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    questionsDb.update({id: question.id}, question, {upsert: true});
}

router.get('/', function (req, res) {

    res.json({
        apiStatus: "OK"
    })
});


router.get('/questions/get', function (req, res) {


    questionsDb.find({}, function (err, docs) {
        return res.json(docs);
    });


});
router.get('/question/get', function (req, res) {

    var randomQuestion = randomIntFromInterval(questions.length)
    questionsDb.find({id: randomQuestion}, function (err, docs) {
        return res.json(docs);
    });


});
router.post('/answers/:questionId/add', function (req, res) {
    var answer = {questionId: req.params.questionId, value: req.body.value, timestamp: new Date()}
    answersDb.insert(answer, function (err, docs) {
        return res.json(docs);
    });


});


router.get('/answers/:questionId/get', function (req, res) {

    var requestedId = req.params.questionId;

    answersDb.find({questionId: requestedId}, function (err, docs) {
        return res.json(docs);
    });
});
router.get('/answers/:questionId/get', function (req, res) {

    var requestedId = req.params.questionId;

    answersDb.find({questionId: requestedId}, function (err, docs) {
        return res.json(docs);
    });
});

function randomIntFromInterval(max) {
    return Math.floor(Math.random() * max + 1)
}
module.exports = router;