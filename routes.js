var express = require('express');
var router = express.Router();
var path = require('path');
var Promise = require("bluebird")

var _ = require("lodash")


var datastore = require('nedb');

Promise.promisifyAll(datastore.prototype);

var questionsDb = new datastore({filename: './db/questions', autoload: true}),
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
            {text: "High school diploma", value: 2},
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
            {
                text: "Energy and Commodity asset deleveraging is leading to an increase in the need for liquidity",
                value: 5
            },
            {
                text: "The sharp deterioration in riskier assets is emblematic of a change to monetary policy mix that is upsetting the over-reliance on cheap credit",
                value: 6
            }
        ]
    },
    {
        text: 'Have you ever been a member of or in any way associated (either directly or indirectly) with the Communist Party?',
        id: 7,
        answers: [
            {text: "Yes", value: 1},
            {text: "No", value: 2},
            {text: "I don't remember", value: 3}
        ]
    },
    {
        text: 'What range includes your age?',
        id: 8,
        answers: [
            {text: "18 or less", value: 1},
            {text: "18 to 24", value: 2},
            {text: "25 - 34", value: 3},
            {text: "35 - 44", value: 4},
            {text: "45 - 54", value: 5},
            {text: "55 or older", value: 6}
        ]
    }

];
for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    questionsDb.update({id: question.id}, question, {upsert: true});
}

router.get('/', function (req, res) {

    res.sendfile('index.html', {root: __dirname + "/public/"});
});

router.get('/api/questions/get', function (req, res) {


    questionsDb.find({}, function (err, docs) {
        return res.json(docs);
    });


});
router.get('/api/questions/:questionId/get', function (req, res) {

    var questionId = parseInt(req.params.questionId)
    questionsDb.findOneAsync({id: questionId}).then((docs)  =>res.json(docs));

});
router.get('/api/survey/get/:priorQuestionId?', function (req, res) {

        var questionId = req.params.priorQuestionId || 0;
        questionId++;
        if (questionId > questions.length - 1) {
            questionId = 1;
        }
        questionsDb.findOneAsync({id: questionId}).then((docs)=>  res.json(docs));

    }
);

router.get('/api/answers/:questionId/summary', function (req, res) {audittrail
    var questionId = parseInt(req.params.questionId)
    computeSurveyResults(questionId).then((s)=>res.json(s));
});

function computeSurveyResults(questionId) {
    var summaryDoc = null;

    return questionsDb.findOneAsync({id: questionId})
        .then(function (doc) {
            return _.map(_.groupBy(doc.answers, function (b) {
                    return b.text;
                }
            ), function (item, key) {
                return {answer: key, percentage: 0, count: 0}
            })
        })
        .then(function (summary) {
            summaryDoc = summary;
            return answersDb.findAsync({questionId: questionId})
        })
        .then(function (answers) {
            var counts = getQuestionResults(answers)
            summaryDoc.forEach(function (item) {
                var sum = _.find(counts, {'answer': item.answer})
                if (sum != null) {
                    item.count = sum.count;
                    item.percentage = sum.percentage;
                }
            })
            return summaryDoc;
        })

}

function getQuestionResults(answers) {
  
    var totalCount = answers.length;
    return _.map(_.groupBy(answers, function (b) {
        return b.value
    }), function (item, key) {
        var size = item.length;
        return {answer: key, count: size, percentage: Math.round(size / totalCount * 100)}
    })


}
router.post('/api/answers/:questionId/add', function (req, res) {
    var answer = {questionId: parseInt(req.params.questionId), value: req.body.value, timestamp: new Date(), buzz:req.body.value}
    answersDb.insertAsync(answer).catch(function(e) {
            res.json(err)
    });
    var questionId = parseInt(req.params.questionId);
    computeSurveyResults(questionId).then( (summary)=>res.json(summary));

});


router.get('/api/answers/:questionId/get', function (req, res) {

    var requestedId = parseInt(req.params.questionId);
    answersDb.findAsync({questionId: requestedId}).then((d)=> res.json(d));
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1)
}
module.exports = router;