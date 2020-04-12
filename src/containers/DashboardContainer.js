import {connect} from 'react-redux'
import View from '../views/Dashboard'
import {getTagDashboard} from '../actions/tagActions'
import {loadQuizzes} from '../actions/quizMainActions'
import {loadChartData} from '../actions/insightsTopicActions'
import {loadConfidenceInsightsData} from '../actions/insightsConfidenceActions'

const mapStateToProps = state => ({
  insightsTopic: state.insightsTopic,
  insightsConfidence: state.insightsConfidence,
  tags: state.tags,
  quizMain: state.quizMain,
})

const mapDispatchToProps = dispatch => ({
  getTagDashboard: () => dispatch(getTagDashboard()),
  loadQuizzes: () => dispatch(loadQuizzes()),
  loadChartData: () => dispatch(loadChartData()),
  loadConfidenceInsightsData: () => dispatch(loadConfidenceInsightsData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
