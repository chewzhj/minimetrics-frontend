import {connect} from 'react-redux'
import View from '../views/InsightsTopic'
import {
  loadChartData,
  getQuestionsOfTopics,
  viewQuestion,
  changeDropdown,
  clickBar,
  closeModal,
  openTutorialModal,
  closeTutorialModal,
} from '../actions/insightsTopicActions'

const mapStateToProps = state => ({
  insightsTopic: state.insightsTopic,
  tags: state.tags,
  quizMain: state.quizMain,
})

const mapDispatchToProps = dispatch => ({
  loadChartData: () => dispatch(loadChartData()),
  getQuestionsOfTopics: (moduleID, quizID, tagID) => dispatch(getQuestionsOfTopics(moduleID, quizID, tagID)),
  changeDropdown: value => dispatch(changeDropdown(value)),
  clickBar: (tag, quiz) => dispatch(clickBar(tag, quiz)),
  clickViewQuestion: value => dispatch(viewQuestion(value)),
  closeModal: () => dispatch(closeModal()),
  openTutorialModal: () => dispatch(openTutorialModal()),
  closeTutorialModal: () => dispatch(closeTutorialModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
