import {
  INSIGHTS_TOPIC_LOAD_CHART_START,
  INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
  INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  INSIGHTS_TOPIC_GET_QUESTIONS_START,
  INSIGHTS_TOPIC_GET_QUESTIONS_SUCCESS,
  INSIGHTS_TOPIC_GET_QUESTIONS_FAILURE,
  INSIGHTS_TOPIC_VIEW_QUESTION_START,
  INSIGHTS_TOPIC_VIEW_QUESTION_SUCCESS,
  INSIGHTS_TOPIC_VIEW_QUESTION_FAILURE,
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
  INSIGHTS_TOPIC_CLICK_BAR,
  INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
  INSIGHTS_TOPIC_CLOSE_MODAL,
  INSIGHTS_TOPIC_OPEN_TUTORIAL_MODAL,
  INSIGHTS_TOPIC_CLOSE_TUTORIAL_MODAL,
} from '../variables/constants/InsightsTopicConstants'
import {getTags} from '../actions/tagActions'
import {loadQuizzes} from '../actions/quizMainActions'
import {getTopicInsightsAPI, getQuestionsOfTopicsAPI, getQuestionAPI} from '../api/InsightsAPI'

export function loadChartData() {
  return function(dispatch) {
    dispatch(loadChartStart())
    dispatch(getTags())
    dispatch(loadQuizzes())
    const moduleID = sessionStorage.getItem('moduleID')
    if (moduleID && moduleID.length > 10) {
      return getTopicInsightsAPI(moduleID)
      .then(json => {
        if (!json.data.hasError) {
          dispatch(loadChartSuccess(json.data.tagInsights))
        } else {
          dispatch(loadChartFailure())
        }
      })
      .catch(err => {
        dispatch(loadChartFailure())
      })
    } else {
      dispatch(loadChartFailure())
    }
  }
}
export function getQuestionsOfTopics(moduleID, quizID, tagID) {
  return function(dispatch) {
    dispatch(getQuestionsStart())
    return getQuestionsOfTopicsAPI(moduleID, quizID, tagID)
      .then(json => {
        // console.log(json.data);
        if (!json.data.hasError) {
          dispatch(getQuestionsSuccess(json.data.quizList))
        } else {
          dispatch(getQuestionsFailure())
        }
      })
      .catch(err => {
        dispatch(getQuestionsFailure())
      })
  }
}
export function viewQuestion(questionID) {
  return function(dispatch) {
    dispatch(viewQuestionStart())
    return getQuestionAPI(questionID)
      .then(json => {
        console.log(json.data);
        if (!json.data.hasError) {
          dispatch(viewQuestionSuccess(json.data.question))
        } else {
          dispatch(viewQuestionFailure())
        }
      })
      .catch(err => {
        dispatch(viewQuestionFailure())
      })
  }
}

function loadChartStart() {
  return {
    type: INSIGHTS_TOPIC_LOAD_CHART_START,
  }
}
function loadChartSuccess(value) {
  return {
    type: INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
    value
  }
}
function loadChartFailure() {
  return {
    type: INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  }
}
function getQuestionsStart() {
  return {
    type: INSIGHTS_TOPIC_GET_QUESTIONS_START,
  }
}
function getQuestionsSuccess(value) {
  return {
    type: INSIGHTS_TOPIC_GET_QUESTIONS_SUCCESS,
    value
  }
}
function getQuestionsFailure() {
  return {
    type: INSIGHTS_TOPIC_GET_QUESTIONS_FAILURE,
  }
}
function viewQuestionStart() {
  return {
    type: INSIGHTS_TOPIC_VIEW_QUESTION_START,
  }
}
function viewQuestionSuccess(value) {
  return {
    type: INSIGHTS_TOPIC_VIEW_QUESTION_SUCCESS,
    value
  }
}
function viewQuestionFailure() {
  return {
    type: INSIGHTS_TOPIC_VIEW_QUESTION_FAILURE,
  }
}

export function changeDropdown(value) {
  return {
    type: INSIGHTS_TOPIC_CHANGE_DROPDOWN,
    value
  }
}
export function clickBar(tag, quiz) {
  return {
    type: INSIGHTS_TOPIC_CLICK_BAR,
    tag,
    quiz,
  }
}
export function clickViewQuestion(value) {
  return {
    type: INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
    value
  }
}
export function closeModal() {
  return {
    type: INSIGHTS_TOPIC_CLOSE_MODAL
  }
}
export function openTutorialModal() {
  return {
    type: INSIGHTS_TOPIC_OPEN_TUTORIAL_MODAL,
  }
}
export function closeTutorialModal() {
  return {
    type: INSIGHTS_TOPIC_CLOSE_TUTORIAL_MODAL,
  }
}
