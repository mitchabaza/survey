import {RECEIVE_QUESTION, DISPLAY_RESULTS, ANSWER_QUESTION} from "../constants/ActionTypes";

const initialState = {question:{text:"",id:"", answers:[]},surveyResults:{}}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTION:

            var newState=Object.assign({}, state, {questions:action.question});
           
            return newState;


        case DISPLAY_RESULTS:


        case ANSWER_QUESTION:



        default:
            return state
    }
}

