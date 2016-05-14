"use strict"

import * as ActionTypes from "../constants/ActionTypes";

const initialState = {question:{text:"",id:"", answers:[]},surveyResults:[],pageState:{ questionSubmitted:false, allowSubmit:false}}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.RECEIVE_QUESTION:
           return Object.assign({}, state, {question:action.question});

        case ActionTypes.DISPLAY_RESULTS:

            return  Object.assign({}, state, {surveyResults:action.surveyResults});

        case ActionTypes.SUBMIT_QUESTION:
            return  Object.assign({}, state,  {pageState:{allowSubmit:state.pageState.allowSubmit, questionSubmitted:true}});
        case ActionTypes.TRY_AGAIN:
            return  initialState;

        case ActionTypes.ANSWER_SELECTED:
            return  Object.assign({}, state, {pageState:{allowSubmit:true,questionSubmitted:state.pageState.questionSubmitted}});

        default:
            return state;
    }
}

