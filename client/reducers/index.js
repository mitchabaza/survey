import {RECEIVE_QUESTION, DISPLAY_RESULTS, ANSWER_QUESTION} from "../constants/ActionTypes";

const initialState = {question:{text:"",id:"", answers:[]},surveyResults:[],allowNext:false}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTION:

           return Object.assign({}, state, {question:action.question});


        case DISPLAY_RESULTS:
            return  Object.assign({}, state, {surveyResults:action.surveyResults}, {allowNext:true});

        default:
            return state
    }
}

