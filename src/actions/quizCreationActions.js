import {
  QUIZ_CREATION_CHANGE_TAB,
  QUIZ_CREATION_CHANGE_STEP,
  QUIZ_CREATION_OPEN_PREVIEW,
  QUIZ_CREATION_CLOSE_PREVIEW,
  QUIZ_CREATION_CHANGE_TITLE,
  QUIZ_CREATION_CHANGE_OPENING_DATE,
  QUIZ_CREATION_CHANGE_OPENING_TIME,
  QUIZ_CREATION_CHANGE_CLOSING_DATE,
  QUIZ_CREATION_CHANGE_CLOSING_TIME,
  QUIZ_CREATION_CHANGE_MAX_ATTEMPTS,
  QUIZ_CREATION_TOGGLE_ATTEMPT_LIMIT,
  QUIZ_CREATION_TOGGLE_CONFIDENCE,
  QUIZ_CREATION_CHANGE_QUESTION_PANEL,
  QUIZ_CREATION_UPDATE_QUESTIONS,
  QUIZ_CREATION_CREATE_START,
  QUIZ_CREATION_CREATE_SUCCESS,
  QUIZ_CREATION_CREATE_FAILURE,
  QUIZ_CREATION_RESET_NOTIFICATION,
  QUIZ_CREATION_RESET,
} from '../variables/constants/QuizCreationConstants'
import {postCreateNewQuizAPI} from '../api/QuizAPI'

export function createQuiz(quiz) {
  return function(dispatch) {
    dispatch(createQuizStart())
    return postCreateNewQuizAPI(quiz)
      .then(json => {
        if (!json.data.hasError) {
          dispatch(createQuizSuccess())
          // onNotification('success')
        } else {
          dispatch(createQuizFailure())
          // onNotification('error')
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
export function changeStep(value) {
  return ({
    type: QUIZ_CREATION_CHANGE_STEP,
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
export function changeOpeningDate(value) {
  return {
    type: QUIZ_CREATION_CHANGE_OPENING_DATE,
    value
  }
}
export function changeOpeningTime(value) {
  return {
    type: QUIZ_CREATION_CHANGE_OPENING_TIME,
    value
  }
}
export function changeClosingDate(value) {
  return {
    type: QUIZ_CREATION_CHANGE_CLOSING_DATE,
    value
  }
}
export function changeClosingTime(value) {
  return {
    type: QUIZ_CREATION_CHANGE_CLOSING_TIME,
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
export function changeQuestionPanel(value) {
  return {
    type: QUIZ_CREATION_CHANGE_QUESTION_PANEL,
    value
  }
}
export function updateQuestions(value) {
  return {
    type: QUIZ_CREATION_UPDATE_QUESTIONS,
    value
  }
}
export function resetNotification() {
  return {
    type: QUIZ_CREATION_RESET_NOTIFICATION
  }
}
export function discardQuizCreation() {
  return {
    type: QUIZ_CREATION_RESET
  }
}
