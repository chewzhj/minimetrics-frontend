import {connect} from 'react-redux'
import View from '../views/Dashboard'
import {getTagDashboard} from '../actions/tagActions'
import {loadQuizzes} from '../actions/quizMainActions'
import {loadChartData} from '../actions/insightsTopicActions'

const mapStateToProps = state => ({
  insightsTopic: state.insightsTopic,
  tags: state.tags,
  quizMain: state.quizMain,
})

const mapDispatchToProps = dispatch => ({
  getTagDashboard: () => dispatch(getTagDashboard()),
  loadQuizzes: () => dispatch(loadQuizzes()),
  loadChartData: () => dispatch(loadChartData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
