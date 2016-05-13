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
    console.log("url:" + url)
    return url;
}
export function answerQuestion(questionId, answer) {

    return dispatch => {

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

export function fetchQuestion() {
    return dispatch => {
        return fetch(getUrl() + `/api/survey/get`)
            .then(response => response.json())
            .then(json => dispatch(receiveQuestion(json)))
    }
}
export function receiveQuestion(question) {
    return {type: types.RECEIVE_QUESTION, question}
}


export function displayResults(surveyResults) {
    return {type: types.DISPLAY_RESULTS, surveyResults}
}

