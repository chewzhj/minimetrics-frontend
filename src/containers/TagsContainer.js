import {connect} from 'react-redux'
import View from '../views/Tags'
import {getTags} from '../actions/tagActions'

const mapStateToProps = state => ({
  tags: state.tags
})

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(getTags()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
