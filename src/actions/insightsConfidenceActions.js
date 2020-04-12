import {
  INSIGHTS_CONFIDENCE_LOAD_DATA_START,
  INSIGHTS_CONFIDENCE_LOAD_DATA_SUCCESS,
  INSIGHTS_CONFIDENCE_LOAD_DATA_FAILURE,
  INSIGHTS_CONFIDENCE_CLICK_GROUP,
  INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
  INSIGHTS_CONFIDENCE_OPEN_TUTORIAL_MODAL,
  INSIGHTS_CONFIDENCE_CLOSE_TUTORIAL_MODAL,
} from '../variables/constants/InsightsConfidenceConstants'
import {getConfidenceInsightsAPI} from '../api/InsightsAPI'

export function loadConfidenceInsightsData() {
  return function(dispatch) {
    dispatch(loadDataStart())
    const moduleID = sessionStorage.getItem('moduleID')
    if (moduleID && moduleID.length > 10) {
      return getConfidenceInsightsAPI(moduleID)
      .then(json => {
        if (!json.data.hasError) {
          dispatch(loadDataSuccess(json.data.results[0]))
        } else {
          dispatch(loadDataFailure())
        }
      })
      .catch(err => {
        dispatch(loadDataFailure())
      })
    } else {
      dispatch(loadDataFailure())
    }
  }
}

function loadDataStart() {
  return {
    type: INSIGHTS_CONFIDENCE_LOAD_DATA_START
  }
}
function loadDataSuccess(data) {
  return {
    type: INSIGHTS_CONFIDENCE_LOAD_DATA_SUCCESS,
    value: data
  }
}
function loadDataFailure() {
  return {
    type: INSIGHTS_CONFIDENCE_LOAD_DATA_FAILURE
  }
}

export function clickGroup(value) {
  return {
    type: INSIGHTS_CONFIDENCE_CLICK_GROUP,
    value
  }
}
export function exportGroup() {
  return {
    type: INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  }
}
export function closeExportModal() {
  return {
    type: INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
  }
}
export function openTutorialModal() {
  return {
    type: INSIGHTS_CONFIDENCE_OPEN_TUTORIAL_MODAL,
  }
}
export function closeTutorialModal() {
  return {
    type: INSIGHTS_CONFIDENCE_CLOSE_TUTORIAL_MODAL,
  }
}
