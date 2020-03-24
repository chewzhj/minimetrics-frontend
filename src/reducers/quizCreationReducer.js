import {
  QUIZ_CREATION_CHANGE_TAB,
  QUIZ_CREATION_OPEN_PREVIEW,
  QUIZ_CREATION_CLOSE_PREVIEW,
} from '../variables/constants/QuizCreationConstants'

const initialState = {
  // default settings
  currentTab: 'basic-settings',
  quizPreviewVisible: false,
  questions: [],
  passwordRequired: false,
  timeLimit: -1, // means no time limit
}

export function quizCreationReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_CREATION_CHANGE_TAB:
      return {...state, currentTab: action.value}
    case QUIZ_CREATION_OPEN_PREVIEW:
      return {...state, quizPreviewVisible: true}
    case QUIZ_CREATION_CLOSE_PREVIEW:
      return {...state, quizPreviewVisible: false}
    default:
      return state
  }
}
