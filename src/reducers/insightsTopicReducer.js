import {
  INSIGHTS_TOPIC_LOAD_CHART_START,
  INSIGHTS_TOPIC_LOAD_CHART_SUCCESS,
  INSIGHTS_TOPIC_LOAD_CHART_FAILURE,
  INSIGHTS_TOPIC_GET_QUESTIONS_START,
  INSIGHTS_TOPIC_GET_QUESTIONS_SUCCESS,
  INSIGHTS_TOPIC_GET_QUESTIONS_FAILURE,
  INSIGHTS_TOPIC_VIEW_QUESTION_START,
  INSIGHTS_TOPIC_VIEW_QUESTION_SUCCESS,
  INSIGHTS_TOPIC_VIEW_QUESTION_FAILURE,
  INSIGHTS_TOPIC_CHANGE_DROPDOWN,
  INSIGHTS_TOPIC_CLICK_BAR,
  INSIGHTS_TOPIC_CLICK_VIEW_QUESTION,
  INSIGHTS_TOPIC_CLOSE_MODAL,
  INSIGHTS_TOPIC_OPEN_TUTORIAL_MODAL,
  INSIGHTS_TOPIC_CLOSE_TUTORIAL_MODAL,
} from '../variables/constants/InsightsTopicConstants'

const initialState = {
  graphDropdown: 'all',
  selectedTag: '',
  selectedQuiz: '',
  viewQuestionID: '', // remove after modal
  graphLoading: false,
  graphData: [],
  questionTableLoading: false,
  questionTableData: [],
  viewQuestionModalVisible: false,
  viewQuestion: {},
  viewQuestionLoading: false,
  tutorialModalVisible: false,
}

export function insightsTopicReducer(state = initialState, action) {
  switch(action.type) {
    case INSIGHTS_TOPIC_LOAD_CHART_START:
      return {...state, graphLoading: true}
    case INSIGHTS_TOPIC_LOAD_CHART_SUCCESS:
      return {...state, graphLoading: false, graphData: action.value}
    case INSIGHTS_TOPIC_LOAD_CHART_FAILURE:
      return {...state, graphLoading: false}
    case INSIGHTS_TOPIC_GET_QUESTIONS_START:
      return {...state, questionTableLoading: true}
    case INSIGHTS_TOPIC_GET_QUESTIONS_SUCCESS:
      return {...state, questionTableLoading: false, questionTableData: action.value}
    case INSIGHTS_TOPIC_GET_QUESTIONS_FAILURE:
      return {...state, questionTableLoading: false}
    case INSIGHTS_TOPIC_VIEW_QUESTION_START:
      return {...state, viewQuestionLoading: true, viewQuestionModalVisible: true}
    case INSIGHTS_TOPIC_VIEW_QUESTION_SUCCESS:
      return {...state, viewQuestionLoading: false, viewQuestion: action.value}
    case INSIGHTS_TOPIC_VIEW_QUESTION_FAILURE:
      return {...state, viewQuestionLoading: false}
    case INSIGHTS_TOPIC_CHANGE_DROPDOWN:
      return {...state, graphDropdown: action.value, questionTableData:[], selectedTag: '', selectedQuiz: ''}
    case INSIGHTS_TOPIC_CLICK_BAR:
      return {...state, selectedTag: action.tag, selectedQuiz: action.quiz}
    case INSIGHTS_TOPIC_CLICK_VIEW_QUESTION:
      return {...state, viewQuestionID: action.value}
    case INSIGHTS_TOPIC_CLOSE_MODAL:
      return {...state, viewQuestionID: '', viewQuestionModalVisible: false, viewQuestion: {}}
    case INSIGHTS_TOPIC_OPEN_TUTORIAL_MODAL:
      return {...state, tutorialModalVisible: true}
    case INSIGHTS_TOPIC_CLOSE_TUTORIAL_MODAL:
      return {...state, tutorialModalVisible: false}
    default:
      return state
  }
}
