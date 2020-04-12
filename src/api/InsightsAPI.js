import API from './APIConfig'

// Topic/Tag Insights API

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

export async function getQuestionAPI(questionID) {
  try {
    let data = await API.post('question/retrieve',
      {
        questionID: questionID
      }
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Student / Confidence Insights API

export async function getConfidenceInsightsAPI(moduleID) {
  try {
    let data = await API.get('insights/confidenceQuadrant', {
      'params': {
        moduleId: moduleID
      }
    })
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
