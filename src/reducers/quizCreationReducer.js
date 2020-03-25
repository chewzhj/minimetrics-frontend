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
} from '../variables/constants/QuizCreationConstants'

const initialState = {
  // default settings
  currentTab: 'basic-settings',
  quizPreviewVisible: false,

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
    default:
      return state
  }
}
