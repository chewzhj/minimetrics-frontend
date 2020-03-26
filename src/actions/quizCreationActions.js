import {
  QUIZ_CREATION_CHANGE_TAB,
  QUIZ_CREATION_OPEN_PREVIEW,
  QUIZ_CREATION_CLOSE_PREVIEW,
  QUIZ_CREATION_CHANGE_TITLE,
  QUIZ_CREATION_CHANGE_DATES,
  QUIZ_CREATION_CHANGE_MAX_ATTEMPTS,
  QUIZ_CREATION_TOGGLE_ATTEMPT_LIMIT,
  QUIZ_CREATION_TOGGLE_CONFIDENCE,
  QUIZ_CREATION_UPDATE_QUESTIONS,
  QUIZ_CREATION_CREATE_START,
  QUIZ_CREATION_CREATE_SUCCESS,
  QUIZ_CREATION_CREATE_FAILURE,
} from '../variables/constants/QuizCreationConstants'
import {postCreateNewQuizAPI} from '../api/QuizAPI'

export function createQuiz(quiz) {
  return function(dispatch) {
    dispatch(createQuizStart())
    return postCreateNewQuizAPI(quiz)
      .then(json => {
        if (!json.data.hasError) {
          dispatch(createQuizSuccess())
        } else {
          dispatch(createQuizFailure())
        }
      })
      .catch(err => {
        dispatch(createQuizFailure())
      })
  }
}
function createQuizStart() {
  return {
    type: QUIZ_CREATION_CREATE_START
  }
}
function createQuizSuccess() {
  return {
    type: QUIZ_CREATION_CREATE_SUCCESS
  }
}
function createQuizFailure() {
  return {
    type: QUIZ_CREATION_CREATE_FAILURE
  }
}

export function changeTab(value) {
  return ({
    type: QUIZ_CREATION_CHANGE_TAB,
    value,
  })
}
export function openPreview() {
  return {
    type: QUIZ_CREATION_OPEN_PREVIEW
  }
}
export function closePreview() {
  return {
    type: QUIZ_CREATION_CLOSE_PREVIEW
  }
}
export function changeTitle(value) {
  return {
    type: QUIZ_CREATION_CHANGE_TITLE,
    value
  }
}
export function changeDates(value) {
  return {
    type: QUIZ_CREATION_CHANGE_DATES,
    value
  }
}
export function changeMaxAttempts(value) {
  return {
    type: QUIZ_CREATION_CHANGE_MAX_ATTEMPTS,
    value
  }
}
export function toggleAttemptLimit(value) {
  return {
    type: QUIZ_CREATION_TOGGLE_ATTEMPT_LIMIT,
    value
  }
}
export function toggleConfidence(value) {
  return {
    type: QUIZ_CREATION_TOGGLE_CONFIDENCE,
    value
  }
}
export function updateQuestions(value) {
  return {
    type: QUIZ_CREATION_UPDATE_QUESTIONS,
    value
  }
}
