import {
  ON_CHANGE_EMAIL,
  ON_CHANGE_PASSWORD,
  ON_CHANGE_RMBME,
  CLICK_LOGIN,
} from '../variables/constants/LoginConstants'
import {
  loginAPI,
  logoutAPI,
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
    return loginAPI(username, password)
     .then(json => {
       // console.log(json.data.results[0]);
       const hasError = json.data.hasError

       if (!hasError) {
         const userDetails = json.data.results[0].userDetails
         const ownerList = userDetails.ownerOf
         const managerList = userDetails.managerOf

         // find IS1103 module
         let is1103moduleId = ""
         for (const mod of ownerList) {
           // only manager or owner of IS1103
           if (mod.moduleCode === "IS1103") {
             is1103moduleId = mod.id
             break
           }
         }
         if (is1103moduleId === "") {
           // only check manager list if owner list does not have it
           for (const mod of managerList) {
             // only manager or owner of IS1103
             if (mod.moduleCode === "IS1103") {
               is1103moduleId = mod.id
               break
             }
           }
         }

         if (ownerList.length + managerList.length > 0 && is1103moduleId !== "") {
           sessionStorage.setItem('sessionKey', json.data.results[0].sessionKey);
           sessionStorage.setItem('name', userDetails.givenName);
           sessionStorage.setItem('userId', userDetails.id);
           sessionStorage.setItem('moduleId', is1103moduleId);
           window.location.href = 'http://localhost:3000/';
         } else {
           alert('Not a manager or owner of IS1103!');
           // alert('Not a manager or owner of any module!');
           return null;
         }
       } else {
         alert('Wrong username/password!');
         return null;
       }
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

export function logout() {
  sessionStorage.clear()
  logoutAPI()
  window.location.href = 'http://localhost:3000/';
}
