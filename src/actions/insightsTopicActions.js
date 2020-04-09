import {
  INSIGHTS_TOPIC_LOAD_CHART_START,
  INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
  INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
  INSIGHTS_TOPIC_CLICK_BAR,
  INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
  INSIGHTS_TOPIC_CLOSE_MODAL,
} from '../variables/constants/InsightsTopicConstants'
import {getTopicInsightsAPI} from '../api/InsightsAPI'

export function loadChartData(moduleID) {
  return function(dispatch) {
    dispatch(loadChartStart())
    return getTopicInsightsAPI()
      .then(json => {
        if (!json.data.hasError) {
          dispatch(loadChartSuccess(json.data.quizList))
        } else {
          dispatch(loadChartFailure())
        }
      })
      .catch(err => {
        dispatch(loadChartFailure())
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
