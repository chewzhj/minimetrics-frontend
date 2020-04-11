import {
  INSIGHTS_CONFIDENCE_CLICK_GROUP,
  INSIGHTS_CONFIDENCE_EXPORT_GROUP,
  INSIGHTS_CONFIDENCE_CLOSE_EXPORT_MODAL,
  INSIGHTS_CONFIDENCE_OPEN_TUTORIAL_MODAL,
  INSIGHTS_CONFIDENCE_CLOSE_TUTORIAL_MODAL,
} from '../variables/constants/InsightsConfidenceConstants'

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
