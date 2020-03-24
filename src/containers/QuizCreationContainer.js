import {connect} from 'react-redux'
import View from '../views/QuizCreation'
import {
  changeTab,
  openPreview,
  closePreview,
} from '../actions/quizCreationActions'

const mapStateToProps = state => ({
  quizCreation: state.quizCreation
})

const mapDispatchToProps = dispatch => ({
  changeTab: (value) => dispatch(changeTab(value)),
  openPreview: () => dispatch(openPreview()),
  closePreview: () => dispatch(closePreview()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
