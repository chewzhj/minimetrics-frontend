import {
  TAG_LOAD_TAGS,
  TAG_LOAD_TAGS_SUCCESS,
  TAG_LOAD_TAGS_FAILURE,
  TAG_LOAD_DASHBOARD_TAGS,
  TAG_LOAD_DASHBOARD_TAGS_SUCCESS,
  TAG_LOAD_DASHBOARD_TAGS_FAILURE,
} from '../variables/constants/TagConstants'

const initialState = {
  tagList: [],
  tagsLoading: false,
  tagDashboardData: {
    totalTags: 0,
    usedTags: 0
  },
  tagDashboardLoading: false,
}

export function tagReducer(state = initialState, action) {
  switch (action.type) {
    case TAG_LOAD_TAGS:
      return {...state, tagsLoading: true}
    case TAG_LOAD_TAGS_SUCCESS:
      return {...state, tagList: action.value, tagsLoading: false}
    case TAG_LOAD_TAGS_FAILURE:
      return {...state, tagsLoading: false}
    case TAG_LOAD_DASHBOARD_TAGS:
      return {...state, tagDashboardLoading: true}
    case TAG_LOAD_DASHBOARD_TAGS_SUCCESS:
      return {...state, tagDashboardLoading: false, tagDashboardData: action.value}
    case TAG_LOAD_DASHBOARD_TAGS_FAILURE:
      return {...state, tagDashboardLoading: false}
    default:
      return state;
  }
}
