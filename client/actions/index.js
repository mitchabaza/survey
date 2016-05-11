import * as types from '../constants/ActionTypes'

export function answerQuestion(value) {

  return { type: types.ANSWER_QUESTION, value }
}

export function displayQuestion() {
  
  return { type: types.DISPLAY_QUESTION }
}

export function displayResults(id, text) {
  return { type: types.DISPLAY_RESULTS, id, text }
}

