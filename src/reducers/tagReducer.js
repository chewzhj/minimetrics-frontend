import {
  TAG_LOAD_TAGS,
  TAG_LOAD_TAGS_SUCCESS,
  TAG_LOAD_TAGS_FAILURE,
} from '../variables/constants/TagConstants'

const initialState = {
  tagList: [],
  tagsLoading: false,
}

export function tagReducer(state = initialState, action) {
  switch (action.type) {
    case TAG_LOAD_TAGS:
      return {...state, tagsLoading: true}
    case TAG_LOAD_TAGS_SUCCESS:
      return {...state, tagList: action.value, tagsLoading: false}
    case TAG_LOAD_TAGS_FAILURE:
      return {...state, tagsLoading: false}
    default:
      return state;
  }
}
