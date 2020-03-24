import {connect} from 'react-redux'
import View from '../views/QuizMain'

const mapStateToProps = state => ({
  quizMain: state.quizMain
})

// const mapDispatchToProps = dispatch => ({
//
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(View)
