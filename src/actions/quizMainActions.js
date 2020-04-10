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
          const data = json.data.quizList.sort((q1, q2)=>q1.title.localeCompare(q2.title))
          dispatch(loadQuizzesSuccess(data))
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
