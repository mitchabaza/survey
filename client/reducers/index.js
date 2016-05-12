import {RECEIVE_QUESTION, DISPLAY_RESULTS, ANSWER_QUESTION} from "../constants/ActionTypes";

const initialState = {question:{text:"",id:"", answers:[]},surveyResults:{}}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTION:

            var newState=Object.assign({}, state, {question:action.question});
           
            return newState;


        case DISPLAY_RESULTS:
            return state

        case ANSWER_QUESTION:
            var s= Object.assign({}, state);
            console.log("state " + s)
            return s;

        default:
            return state
    }
}

