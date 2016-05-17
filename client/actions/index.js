"use strict"

import fetch from "isomorphic-fetch";
import * as types from "../constants/ActionTypes";


let nodeEnv = process.env.NODE_ENV || 'development';

function getUrl() {
    var url = ""
    if (nodeEnv == "development") {
        url = 'http://localhost:3000'
    }
    else {
        url = "";
    }
    return url;
}
export function answerQuestion(questionId, answer) {

    return function (dispatch) {
        dispatch(
            {type: types.SUBMIT_QUESTION}
        )
        var options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({value: answer})
        }
        return fetch(getUrl() + `/api/answers/${questionId}/add`, options)
            .then(response => response.json())
            .then(json => dispatch(displayResults(json)))
    }
}

export function fetchQuestion(previousQuestion) {
    previousQuestion=previousQuestion||null;
    return dispatch => {
        var url= previousQuestion!=null?getUrl() + `/api/survey/get/${previousQuestion}`:getUrl() + `/api/survey/get/`
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveQuestion(json)))
    }
}


export function receiveQuestion(question) {
    return {type: types.RECEIVE_QUESTION, question}
}
export function answerSelected(answer) {
    return {type: types.ANSWER_SELECTED, answer }
}

export function nextQuestion(previousQuestion) {
    return function (dispatch) {

        dispatch(
            {type: types.NEXT_QUESTION}
        )
        dispatch(fetchQuestion(previousQuestion))
    }

}
export function displayResults(surveyResults) {
    return {type: types.DISPLAY_RESULTS, surveyResults}
}

