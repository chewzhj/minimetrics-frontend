import {connect} from 'react-redux'
import View from '../views/QuizCreation'
import {
  changeTab,
  openPreview,
  closePreview,
  changeTitle,
  changeDates,
  changeMaxAttempts,
  toggleAttemptLimit,
  toggleConfidence,
  updateQuestions,
  createQuiz,
} from '../actions/quizCreationActions'

const mapStateToProps = state => ({
  quizCreation: state.quizCreation
})

const mapDispatchToProps = dispatch => ({
  changeTab: (value) => dispatch(changeTab(value)),
  openPreview: () => dispatch(openPreview()),
  closePreview: () => dispatch(closePreview()),
  changeTitle: (value) => dispatch(changeTitle(value)),
  changeDates: (value) => dispatch(changeDates(value)),
  changeMaxAttempts: (value) => dispatch(changeMaxAttempts(value)),
  toggleAttemptLimit: (value) => dispatch(toggleAttemptLimit(value)),
  toggleConfidence: (value) => dispatch(toggleConfidence(value)),
  updateQuestions: (value) => dispatch(updateQuestions(value)),
  createQuiz: (value) => dispatch(createQuiz(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
