import API from './APIConfig'

export async function getAllTagAPI() {
  try {
    let data = await API.get('/tag/all')
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
