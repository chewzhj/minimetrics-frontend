import {
  TAG_LOAD_TAGS,
  TAG_LOAD_TAGS_SUCCESS,
  TAG_LOAD_TAGS_FAILURE,
  TAG_LOAD_DASHBOARD_TAGS,
  TAG_LOAD_DASHBOARD_TAGS_SUCCESS,
  TAG_LOAD_DASHBOARD_TAGS_FAILURE,
} from '../variables/constants/TagConstants'
import { getAllTagAPI, getTagDashboardAPI } from '../api/TagApi'

export function getTags() {
  return function(dispatch) {
    dispatch(loadTagsStart())
    return getAllTagAPI()
      .then(json => {
        if (!json.data.hasError) {
          const data = json.data.tagList.sort((t1, t2) => t1.tagName.localeCompare(t2.tagName))
          dispatch(loadTagsSuccess(data))
        } else {
          dispatch(loadTagsFailure())
        }
      })
      .catch(err => {
        dispatch(loadTagsFailure())
      })
  }
}
export function getTagDashboard() {
  return function(dispatch) {
    dispatch(loadDashboardTagsStart())
    return getTagDashboardAPI()
      .then(json => {
        if (!json.data.hasError) {
          const data = json.data.results[0]
          dispatch(loadDashboardTagsSuccess(data))
        } else {
          dispatch(loadDashboardTagsFailure())
        }
      })
      .catch(err => {
        dispatch(loadDashboardTagsFailure())
      })
  }
}

function loadTagsStart() {
  return {
    type: TAG_LOAD_TAGS,
  }
}
function loadTagsSuccess(value) {
  return {
    type: TAG_LOAD_TAGS_SUCCESS,
    value
  }
}
function loadTagsFailure() {
  return {
    type: TAG_LOAD_TAGS_FAILURE,
  }
}
function loadDashboardTagsStart() {
  return {
    type: TAG_LOAD_DASHBOARD_TAGS,
  }
}
function loadDashboardTagsSuccess(value) {
  return {
    type: TAG_LOAD_DASHBOARD_TAGS_SUCCESS,
    value
  }
}
function loadDashboardTagsFailure() {
  return {
    type: TAG_LOAD_DASHBOARD_TAGS_FAILURE,
  }
}
