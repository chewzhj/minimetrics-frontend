import {connect} from 'react-redux'
import View from '../views/InsightsTopic'
import {
  loadChartData,
  getQuestionsOfTopics,
  viewQuestion,
  changeDropdown,
  clickBar,
  clickViewQuestion,
  closeModal,
} from '../actions/insightsTopicActions'

const mapStateToProps = state => ({
  insightsTopic: state.insightsTopic,
  tags: state.tags,
  quizMain: state.quizMain,
})

const mapDispatchToProps = dispatch => ({
  loadChartData: value => dispatch(loadChartData(value)),
  getQuestionsOfTopics: (moduleID, quizID, tagID) => dispatch(getQuestionsOfTopics(moduleID, quizID, tagID)),
  // viewQuestion: (questionID) => dispatch(viewQuestion(questionID)),
  changeDropdown: value => dispatch(changeDropdown(value)),
  clickBar: (tag, quiz) => dispatch(clickBar(tag, quiz)),
  clickViewQuestion: value => dispatch(viewQuestion(value)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
