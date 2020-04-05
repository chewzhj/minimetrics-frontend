import {
  TAG_LOAD_TAGS,
  TAG_LOAD_TAGS_SUCCESS,
  TAG_LOAD_TAGS_FAILURE,
} from '../variables/constants/TagConstants'
import { getAllTagAPI } from '../api/TagApi'

export function getTags() {
  return function(dispatch) {
    dispatch(loadTagsStart())
    return getAllTagAPI()
      .then(json => {
        if (!json.data.hasError) {
          dispatch(loadTagsSuccess(json.data.tagList))
        } else {
          dispatch(loadTagsFailure())
        }
      })
      .catch(err => {
        dispatch(loadTagsFailure())
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
