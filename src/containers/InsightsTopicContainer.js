import {connect} from 'react-redux'
import View from '../views/InsightsTopic'
import {
  loadChartData,
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
  changeDropdown: value => dispatch(changeDropdown(value)),
  clickBar: (tag, quiz) => dispatch(clickBar(tag, quiz)),
  clickViewQuestion: value => dispatch(clickViewQuestion(value)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
