import API from './APIConfig'

export async function loginAPI(username, password) {
  try {
    console.log(username + ", " + password)
    let data = await API.get('/session/login', {
      params: {
        'username': username,
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
