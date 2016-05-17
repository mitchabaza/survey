"use strict"

import * as ActionTypes from "../constants/ActionTypes";

const initialState = {
    question: {text: "", id: "", answers: [], selectedAnswer: null},
    surveyResults: [],
    pageState: {questionSubmitted: false, allowSubmit: false}
}

export default function survey(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.RECEIVE_QUESTION:
            var question = Object.assign({},state.question,action.question);
            return Object.assign({}, state, {question: question});

        case ActionTypes.DISPLAY_RESULTS:

            return Object.assign({}, state, {surveyResults: action.surveyResults});

        case ActionTypes.SUBMIT_QUESTION:
            return Object.assign({}, state, {
                pageState: {
                    allowSubmit: state.pageState.allowSubmit,
                    questionSubmitted: true
                }
            });
        case ActionTypes.NEXT_QUESTION:
            return initialState;
        case ActionTypes.ANSWER_SELECTED:

            var pageState = Object.assign({},state.pageState,{
                allowSubmit: true
            });

            var question = Object.assign({}, state.question, {selectedAnswer: action.answer})
            return Object.assign({}, state, {question: question}, {pageState:pageState});


        default:
            return state;
    }
}

