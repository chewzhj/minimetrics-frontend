import {
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
} from '../variables/constants/InsightsTopicConstants'

const initialState = {
  graphDropdown: 'all'
}

export function insightsTopicReducer(state = initialState, action) {
  switch(action.type) {
    case INSIGHTS_TOPIC_CHANGE_DROPDOWN:
      return {...state, graphDropdown: action.value}
    default:
      return state
  }
}
