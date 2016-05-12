import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
let url = "localhost:3000"
export function answerQuestion(value) {

  return dispatch => {

    return fetch(`http://${url}/api/get/questions`)
        .then(response => response.json())
        .then(json => dispatch(receiveQuestion(json)))
  }
}

export function fetchQuestion(dispatch) {
    return dispatch => {
        return fetch(`http://${url}/api/questions/get`)
            .then(response => response.json())
            .then(json => dispatch(receiveQuestion(json)))
    }
}
export function receiveQuestion(question){
    console.log(question)
 return {type:types.RECEIVE_QUESTION, question}
}

export function displayResults(id, text) {
  return { type: types.DISPLAY_RESULTS, id, text }
}

