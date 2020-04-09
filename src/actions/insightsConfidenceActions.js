import {
  INSIGHTS_CONFIDENCE_CHANGE_SELECT,
  INSIGHTS_CONFIDENCE_CLICK_GROUP,
  INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
} from '../variables/constants/InsightsConfidenceConstants'

export function changeSelect(value) {
  return {
    type: INSIGHTS_CONFIDENCE_CHANGE_SELECT,
    value
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
