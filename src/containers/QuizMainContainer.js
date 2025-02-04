import {connect} from 'react-redux'
import View from '../views/QuizMain'
import {loadQuizzes} from '../actions/quizMainActions'

const mapStateToProps = state => ({
  quizMain: state.quizMain
})

const mapDispatchToProps = dispatch => ({
  loadQuizzes: () => dispatch(loadQuizzes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
