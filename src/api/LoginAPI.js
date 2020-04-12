import API from './APIConfig'

export async function loginAPI(username, password) {
  try {
    let data = await API.get('/session/loginWithEmail', {
      params: {
        'email': username,
        'password': password,
      }
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export async function logoutAPI() {
  try {
    let data = await API.get('/session/logout');
    console.log(data);
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
  }
}

export async function getAllModules() {
  try {
    let data = await API.get('/module');
    console.log(data);
    return data;
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
