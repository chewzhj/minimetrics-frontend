import {
  QUIZ_LOAD_MODULE_QUIZZES,
  QUIZ_LOAD_MODULE_QUIZZES_SUCCESS,
  QUIZ_LOAD_MODULE_QUIZZES_FAILURE,
} from '../variables/constants/QuizMainConstants'
import {getAllQuizAPI} from '../api/QuizAPI'

export function loadQuizzes() {
  return function(dispatch) {
    dispatch(loadQuizzesStart())
    return getAllQuizAPI()
      .then(json => {
        if (!json.data.hasError) {
          dispatch(loadQuizzesSuccess(json.data.quizList))
        } else {
          dispatch(loadQuizzesFailure())
        }
      })
      .catch(err => {
        dispatch(loadQuizzesFailure())
      })
  }
}

function loadQuizzesStart() {
  return {
    type: QUIZ_LOAD_MODULE_QUIZZES,
  }
}
function loadQuizzesSuccess(value) {
  return {
    type: QUIZ_LOAD_MODULE_QUIZZES_SUCCESS,
    value
  }
}
function loadQuizzesFailure() {
  return {
    type: QUIZ_LOAD_MODULE_QUIZZES_FAILURE,
  }
}
