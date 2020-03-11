import {
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_RMBME,
  CLICK_LOGIN,
} from '../variables/constants/LoginConstants'

const initialState = {
  email: '',
  password: '',
  rmbme: false,
  loading: false,
}

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE_EMAIL:
      return {...state, email: action.value}
    case ON_CHANGE_PASSWORD:
      return {...state, password: action.value}
    case ON_CHANGE_RMBME:
      return {...state, rmbme: action.value}
    case CLICK_LOGIN:
      return {...state, loading: true}
    default:
      return state
  }
}
