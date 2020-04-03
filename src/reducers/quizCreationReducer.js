import {
  QUIZ_CREATION_CHANGE_TAB,
  QUIZ_CREATION_CHANGE_STEP,
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
  QUIZ_CREATION_RESET_NOTIFICATION,
  QUIZ_CREATION_RESET,
} from '../variables/constants/QuizCreationConstants'

const initialState = {
  // default settings
  currentTab: 'basic-settings',
  currentStep: 0,
  quizPreviewVisible: false,
  submitting: false,
  growlNotification: '',

  // quiz settings
  quizTitle: '',
  quizStartEnd: [null, null],
  quizMaxAttempts: 1,
  quizAttemptUnlimited: false,
  quizConfidenceEnabled: true,

  /*
  within each question is

  {
    key/qnnumber: int
    title: String
    options: []
      {
        key/optionNo: int
        optionText: String
        correctAnswer: boolean
      }
    tags: [] of String
  }
  */
  quizQuestions: [
    // { // example only
    //   questionNumber: 1,
    //   title: "What is the right answer?", // questionText
    //   correctOptionNumber: 2,
    //   options: [ // answerList
    //     {
    //       optionNumber: 1,
    //       optionText: "1 is the wrong answer" // answerText
    //     },
    //     {
    //       optionNumber: 2,
    //       optionText: "2 is the right answer"
    //     },
    //   ],
    //   tags: [ // tagList
    //     "Deontology",
    //     "Virtues",
    //   ]
    // },
  ],
}

export function quizCreationReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_CREATION_CHANGE_TAB:
      return {...state, currentTab: action.value}
    case QUIZ_CREATION_CHANGE_STEP:
      return {...state, currentStep: action.value}
    case QUIZ_CREATION_OPEN_PREVIEW:
      return {...state, quizPreviewVisible: true}
    case QUIZ_CREATION_CLOSE_PREVIEW:
      return {...state, quizPreviewVisible: false}
    case QUIZ_CREATION_CHANGE_TITLE:
      return {...state, quizTitle: action.value}
    case QUIZ_CREATION_CHANGE_DATES:
      return {...state, quizStartEnd: action.value}
    case QUIZ_CREATION_CHANGE_MAX_ATTEMPTS:
      return {...state, quizMaxAttempts: action.value}
    case QUIZ_CREATION_TOGGLE_ATTEMPT_LIMIT:
      return {...state, quizAttemptUnlimited: action.value}
    case QUIZ_CREATION_TOGGLE_CONFIDENCE:
      return {...state, quizConfidenceEnabled: action.value}
    case QUIZ_CREATION_UPDATE_QUESTIONS:
      return {...state, quizQuestions: action.value}
    case QUIZ_CREATION_CREATE_START:
      return {...state, submitting: true}
    case QUIZ_CREATION_CREATE_SUCCESS:
      return {...initialState, growlNotification: 'success'}
    case QUIZ_CREATION_CREATE_FAILURE:
      return {...state, submitting: false, growlNotification: 'error'}
    case QUIZ_CREATION_RESET_NOTIFICATION:
      return {...state, growlNotification: ''}
    case QUIZ_CREATION_RESET:
      return initialState
    default:
      return state
  }
}
