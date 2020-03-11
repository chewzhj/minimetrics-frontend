import {connect} from 'react-redux'
import Login from '../views/Login'
import {
  onChangeEmail,
  onChangePassword,
  onChangeRmbme,
  clickLogin,
} from '../actions/loginActions'

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: (value) => dispatch(onChangeEmail(value)),
  onChangePassword: (value) => dispatch(onChangePassword(value)),
  onChangeRmbme: (value) => dispatch(onChangeRmbme(value)),
  clickLogin: () => dispatch(clickLogin()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
