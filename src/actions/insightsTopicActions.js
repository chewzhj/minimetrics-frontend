import {
  INSIGHTS_TOPIC_LOAD_CHART_START,
  INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
  INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
  INSIGHTS_TOPIC_CLICK_BAR,
  INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
  INSIGHTS_TOPIC_CLOSE_MODAL,
} from '../variables/constants/InsightsTopicConstants'
import {getTags} from '../actions/tagActions'
import {loadQuizzes} from '../actions/quizMainActions'
import {getTopicInsightsAPI} from '../api/InsightsAPI'
import {getAllModules} from '../api/LoginAPI'

// TODO: clean this up after login is made
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
      return getAllModules()
        .then(json => {
          if (!json.data.hasError) {
            sessionStorage.setItem('moduleID', json.data.results[0][0].id)
            return getTopicInsightsAPI(json.data.results[0][0].id)
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
        })
        .catch(err => {
          dispatch(loadChartFailure())
        })
    }
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
