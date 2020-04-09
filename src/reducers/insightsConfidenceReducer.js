import {
  INSIGHTS_CONFIDENCE_CHANGE_SELECT,
  INSIGHTS_CONFIDENCE_CLICK_GROUP,
  INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
} from '../variables/constants/InsightsConfidenceConstants'

const initialState = {
  data: [],
  tagSelection: ["Deontology","Fair Use Doctrine","Values","Rights","Utilitarianism"],
  selectedGroup: 1,
  exportGroupModalVisible: false,
}

export function insightsConfidenceReducer(state = initialState, action) {
  switch (action.type) {
    case INSIGHTS_CONFIDENCE_CHANGE_SELECT:
      return {...state, tagSelection: action.value}
    case INSIGHTS_CONFIDENCE_CLICK_GROUP:
      return {...state, selectedGroup: action.value}
    case INSIGHTS_CONFIDENCE_EXPORT_GROUP:
      return {...state, exportGroupModalVisible: true}
    case INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL:
      return {...state, exportGroupModalVisible: false}
    default:
      return state
  }
}
