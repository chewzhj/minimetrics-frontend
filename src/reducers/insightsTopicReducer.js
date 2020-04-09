import {
  INSIGHTS_TOPIC_LOAD_CHART_START,
  INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
  INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
  INSIGHTS_TOPIC_CLICK_BAR,
  INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
  INSIGHTS_TOPIC_CLOSE_MODAL,
} from '../variables/constants/InsightsTopicConstants'

const initialState = {
  graphDropdown: 'all',
  selectedTag: '',
  selectedQuiz: '',
  viewQuestion: '',
  graphLoading: false,
  graphData: [],
}

export function insightsTopicReducer(state = initialState, action) {
  switch(action.type) {
    case INSIGHTS_TOPIC_LOAD_CHART_START:
      return {...state, graphLoading: true}
    case INSIGHTS_TOPIC_LOAD_CHART_SUCCESS:
      return {...state, graphLoading: false, graphData: action.value}
    case INSIGHTS_TOPIC_LOAD_CHART_FAILURE:
      return {...state, graphLoading: false}
    case INSIGHTS_TOPIC_CHANGE_DROPDOWN:
      return {...state, graphDropdown: action.value, selectedTag: '', selectedQuiz: ''}
    case INSIGHTS_TOPIC_CLICK_BAR:
      return {...state, selectedTag: action.tag, selectedQuiz: action.quiz}
    case INSIGHTS_TOPIC_CLICK_VIEW_QUESTION:
      return {...state, viewQuestion: action.value}
    case INSIGHTS_TOPIC_CLOSE_MODAL:
      return {...state, viewQuestion: ''}
    default:
      return state
  }
}
