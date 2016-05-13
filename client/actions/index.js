import fetch from "isomorphic-fetch";
import * as types from "../constants/ActionTypes";


let server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
let server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
let url = server_ip_address+":"+server_port

export function answerQuestion(questionId, answer) {

    return dispatch => {

        var options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({value: answer})
        }
        return fetch(`http://${url}/api/answers/${questionId}/add`, options)
            .then(response => response.json())
            .then(json => dispatch(displayResults(json)))
    }
}

export function fetchQuestion() {
    return dispatch => {
        return fetch(`http://${url}/api/survey/get`)
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

