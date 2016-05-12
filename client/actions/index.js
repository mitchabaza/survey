import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
let url = "localhost:3000"
export function answerQuestion(questionId,answer ) {

  return dispatch => {

      var options= {
          method: 'post',
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({value:answer})
      }
    return fetch(`http://${url}/api/answers/${questionId}/add`, options)
        .then(response => response.json())
        .then(json => dispatch(displayResults(json)))
  }
}

export function fetchQuestion(dispatch) {
    return dispatch => {
        return fetch(`http://${url}/api/survey/get`)
            .then(response => response.json())
            .then(json => dispatch(receiveQuestion(json)))
    }
}
export function receiveQuestion(question){
 return {type:types.RECEIVE_QUESTION, question}
}

export function displayResults(surveyResults) {
  return { type: types.DISPLAY_RESULTS,surveyResults }
}

