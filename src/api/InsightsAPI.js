import API from './APIConfig'

export async function getTopicInsightsAPI(moduleID) {
  try {
    let data = await API.post('taginsight/module',
      {moduleID: moduleID}
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export async function getQuestionsOfTopicsAPI(moduleID, quizID, tagID) {
  try {
    let data = await API.post('taginsight/incorrectfirstattempts',
      {
        moduleID: moduleID,
        quizID: quizID,
        tagID: tagID,
      }
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
