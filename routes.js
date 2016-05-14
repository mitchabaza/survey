var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require("lodash")

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
            {text: "4", value: 4},
            {text: "5 if you include the poltergeist in the attic", value: 5}

        ]
    },
    {
        text: 'Are you planning on buying a car in the next six months?',
        id: 2,
        answers: [
            {text: "Yes", value: 1},
            {text: "No", value: 2},
            {text: "Maybe", value: 3}

        ]
    },
    {
        text: 'Which of the following people would you consider voting for in a presidential election?',
        id: 3,
        answers: [
            {text: "Bozo The Clown", value: 1},
            {text: "William Shatner", value: 2},
            {text: "Aaron Rodgers", value: 3},
            {text: "The Rock", value: 4}

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
            {text: "Doctorate", value: 8},
            {text: "Clown College", value: 9},

        ]
    },
    {
        text: 'Which statement best describes the current state of the U.S. economy?',
        id: 6,
        answers: [
            {text: "It's growing rapidly", value: 1},
            {text: "It's tanking big time", value: 2},
            {text: "Steady as she goes", value: 3},
            {text: "Energy and Commodity asset deleveraging is leading to an increase in the need for liquidity", value:5},
            {text:"The sharp deterioration in riskier assets is emblematic of a change to monetary policy mix that is upsetting the over-reliance on cheap credit", value:6}
        ]
    }
];
for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    questionsDb.update({id: question.id}, question, {upsert: true});
}

router.get('/', function (req, res) {

    res.sendfile('index.html', { root: __dirname + "/public/" } );
});

router.get('/api/questions/get', function (req, res) {


    questionsDb.find({}, function (err, docs) {
        return res.json(docs);
    });


});
router.get('/api/questions/:questionId/get', function (req, res) {

    var questionId = parseInt(req.params.questionId)
    questionsDb.findOne({id: questionId}, function (err, docs) {
        return res.json(docs);
    });

});
router.get('/api/survey/get', function (req, res) {

    var randomQuestion = randomIntFromInterval(questions.length)
    questionsDb.findOne({id: randomQuestion}, function (err, docs) {
        return res.json(docs);
    });

});

router.get('/api/answers/:questionId/summary', function (req, res) {
    var questionId = parseInt(req.params.questionId)

    computeSurveyResults(questionId, (summary)=>res.json(summary));


});
function computeSurveyResults(questionId, onComplete) {

    questionsDb.findOne({id: questionId}, function (err, doc) {
        var summary = _.map(_.groupBy(doc.answers, function (b) {
                return b.text;
            }
        ), function (item, key) {
            return {answer: key, percentage: 0, count: 0}
        })
        calculateSummary(summary)
    })
    function calculateSummary(summary) {
        answersDb.find({questionId: questionId}, function (err, docs) {
            var counts = getQuestionResults(docs);
            summary.forEach(function (item) {
                var sum = _.find(counts, {'answer': item.answer})
                if (sum != null) {
                    item.count = sum.count;
                    item.percentage = sum.percentage;
                }
            })
            onComplete(summary)
        })
    }
}

function getQuestionResults(docs) {

    var totalCount = docs.length;
    return _.map(_.groupBy(docs, function (b) {
        return b.value
    }), function (item, key) {
        var size = item.length;
        return {answer: key, count: size, percentage: Math.round(size / totalCount * 100)}
    })


}
router.post('/api/answers/:questionId/add', function (req, res) {
    var answer = {questionId: parseInt(req.params.questionId), value: req.body.value, timestamp: new Date()}
    answersDb.insert(answer, function (err, docs) {
        if (err) {
            res.json(err)
        }
    });
    var questionId = parseInt(req.params.questionId);

    computeSurveyResults(questionId, (summary)=>res.json(summary));


});


router.get('/api/answers/:questionId/get', function (req, res) {

    var requestedId = parseInt(req.params.questionId);
    answersDb.find({questionId: requestedId}, function (err, docs) {
        return res.json(docs);
    });
});

function randomIntFromInterval(max) {
    return Math.floor(Math.random() * max + 1)
}
module.exports = router;