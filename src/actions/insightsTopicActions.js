import {
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
} from '../variables/constants/InsightsTopicConstants'

export function changeDropdown(value) {
  return {
    type: INSIGHTS_TOPIC_CHANGE_DROPDOWN,
    value
  }
}
