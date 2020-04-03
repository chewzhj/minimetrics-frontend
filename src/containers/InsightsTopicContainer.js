import {connect} from 'react-redux'
import View from '../views/InsightsTopic'
import {
  changeDropdown,
} from '../actions/insightsTopicActions'

const mapStateToProps = state => ({
  insightsTopic: state.insightsTopic
})

const mapDispatchToProps = dispatch => ({
  changeDropdown: value => dispatch(changeDropdown(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
