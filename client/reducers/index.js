import {DISPLAY_QUESTION, DISPLAY_RESULTS, ANSWER_QUESTION} from "../constants/ActionTypes";

const initialState = {questions:[{
    "text": "Which of the following presidential candidates would you consider voting for in 2016?",
    "id": 3,
    "answers": [{"text": "Bozo The Clown", "value": 1}, {
        "text": "CaveMan from the Geico Commercial",
        "value": 2
    }, {"text": "Aaron Rodgers", "value": 3}],
    "_id": "AL3UKIRMvCxTGW9Q"
}, {
    "text": "How many people live in your household?",
    "id": 1,
    "answers": [{"text": "1", "value": 1}, {"text": "2", "value": 2}, {"text": "3", "value": 3}, {
        "text": "4 or more",
        "value": 4
    }],
    "_id": "IYR2trEoLJKjLFOL"
}, {
    "text": "Are you considering buying a car in the next six months?",
    "id": 2,
    "answers": [{"text": "Yes", "value": 1}, {"text": "No", "value": 2}],
    "_id": "a0LStosN0W4bnFQb"
}]}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_QUESTION:

            var s=Object.assign({}, state, {questions:[state.questions[0]]});
           
            return s;


        case DISPLAY_RESULTS:


        case ANSWER_QUESTION:



        default:
            return state
    }
}

