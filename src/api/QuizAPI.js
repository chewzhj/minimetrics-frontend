import API from './APIConfig'

export async function getAllQuizAPI() {
  try {
    let data = await API.get('/quiz/all')
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export async function postCreateNewQuizAPI(quiz) {
  try {
    let data = await API.post('quiz/create', {
      body: quiz
    })
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
