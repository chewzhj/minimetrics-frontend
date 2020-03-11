import {
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_RMBME,
  CLICK_LOGIN,
} from '../variables/constants/LoginConstants'

export function onChangeEmail(value) {
  return ({
    type: ON_CHANGE_EMAIL,
    value
  })
}
export function onChangePassword(value) {
  return ({
    type: ON_CHANGE_PASSWORD,
    value
  })
}
export function onChangeRmbme(value) {
  return ({
    type: ON_CHANGE_RMBME,
    value
  })
}

export function clickLogin() {
  return ({
    type: CLICK_LOGIN,
  })
}
