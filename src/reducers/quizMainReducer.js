import {
  QUIZ_LOAD_MODULE_QUIZZES,
  QUIZ_LOAD_MODULE_QUIZZES_SUCCESS,
  QUIZ_LOAD_MODULE_QUIZZES_FAILURE,
} from '../variables/constants/QuizMainConstants'

const initialState = {
  quizzes: [],
  quizLoading: false,
}

export function quizMainReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_LOAD_MODULE_QUIZZES:
      return {...state, quizLoading: true}
    case QUIZ_LOAD_MODULE_QUIZZES_SUCCESS:
      return {...state, quizzes: action.value, quizLoading: false}
    case QUIZ_LOAD_MODULE_QUIZZES_FAILURE:
      return {...state, quizLoading: false}
    default:
      return state;
  }
}
