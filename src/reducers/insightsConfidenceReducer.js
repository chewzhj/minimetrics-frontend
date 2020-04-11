import {
  INSIGHTS_CONFIDENCE_CLICK_GROUP,
  INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
  INSIGHTS_CONFIDENCE_OPEN_TUTORIAL_MODAL,
  INSIGHTS_CONFIDENCE_CLOSE_TUTORIAL_MODAL,
} from '../variables/constants/InsightsConfidenceConstants'

const initialState = {
  data: [],
  selectedGroup: 0,
  exportGroupModalVisible: false,
  tutorialModalVisible: false,
}

export function insightsConfidenceReducer(state = initialState, action) {
  switch (action.type) {
    case INSIGHTS_CONFIDENCE_CLICK_GROUP:
      return {...state, selectedGroup: action.value}
    case INSIGHTS_CONFIDENCE_EXPORT_GROUP:
      return {...state, exportGroupModalVisible: true}
    case INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL:
      return {...state, exportGroupModalVisible: false}
    case INSIGHTS_CONFIDENCE_OPEN_TUTORIAL_MODAL:
      return {...state, tutorialModalVisible: true}
    case INSIGHTS_CONFIDENCE_CLOSE_TUTORIAL_MODAL:
      return {...state, tutorialModalVisible: false}
    default:
      return state
  }
}
