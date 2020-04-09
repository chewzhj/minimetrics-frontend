import {connect} from 'react-redux'
import {
  changeSelect,
  clickGroup,
  exportGroup,
  closeExportModal,
} from '../actions/insightsConfidenceActions'
import View from '../views/InsightsConfidence'

const mapStateToProps = state => ({
  insightsConfidence: state.insightsConfidence
})

const mapDispatchToProps = dispatch => ({
  changeSelect: (value) => dispatch(changeSelect(value)),
  clickGroup: (value) => dispatch(clickGroup(value)),
  exportGroup: () => dispatch(exportGroup()),
  closeExportModal: () => dispatch(closeExportModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
