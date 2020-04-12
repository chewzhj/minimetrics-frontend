import {connect} from 'react-redux'
import {
  loadConfidenceInsightsData,
  clickGroup,
  exportGroup,
  closeExportModal,
  openTutorialModal,
  closeTutorialModal,
} from '../actions/insightsConfidenceActions'
import View from '../views/InsightsConfidence'

const mapStateToProps = state => ({
  insightsConfidence: state.insightsConfidence
})

const mapDispatchToProps = dispatch => ({
  loadConfidenceInsightsData: () => dispatch(loadConfidenceInsightsData()),
  clickGroup: (value) => dispatch(clickGroup(value)),
  exportGroup: () => dispatch(exportGroup()),
  closeExportModal: () => dispatch(closeExportModal()),
  openTutorialModal: () => dispatch(openTutorialModal()),
  closeTutorialModal: () => dispatch(closeTutorialModal()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
