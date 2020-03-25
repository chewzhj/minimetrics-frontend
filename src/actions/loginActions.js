import {
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_RMBME,
  CLICK_LOGIN,
} from '../variables/constants/LoginConstants'
import {
  loginAPI
} from '../api/LoginAPI'

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

export function clickLogin(username, password) {
  return function(dispatch) {
    dispatch(tryLogin())
    console.log(username, password);
    return loginAPI(username, password)
     .then(json => {
       console.log(json.data.results[0]);
       sessionStorage.setItem('username', json.data.results[0].linkedUserName);
       // sessionStorage.setItem('permissions', JSON.stringify(json.data.results[0].webAppPermissions));
       sessionStorage.setItem('sessionKey', json.data.results[0].sessionKey);
       window.location.href = 'http://localhost:3000/';
     })
     .catch(err => {
        alert('Wrong username/password!');
        return null;
     });
  }
}
export function tryLogin() {
  return ({
    type: CLICK_LOGIN,
  })
}
