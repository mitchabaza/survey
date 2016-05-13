"use strict"

import {RECEIVE_QUESTION,DISPLAY_RESULTS, SUBMIT_QUESTION} from "../constants/ActionTypes";

const initialState = {question:{text:"",id:"", answers:[]},surveyResults:[],   isLoading:false}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_QUESTION:
           return Object.assign({}, state, {question:action.question});

        case DISPLAY_RESULTS:

            return  Object.assign({}, state, {surveyResults:action.surveyResults}, {isLoading:false});

        case SUBMIT_QUESTION:
            return  Object.assign({}, state,  {isLoading:true});

       
        default:
            return state;
    }
}

