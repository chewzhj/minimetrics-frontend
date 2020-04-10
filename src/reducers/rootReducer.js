import {combineReducers} from 'redux'
import {loginReducer} from './loginReducer'
import {quizMainReducer} from './quizMainReducer'
import {quizCreationReducer} from './quizCreationReducer'
import {tagReducer} from './tagReducer'
import {insightsTopicReducer} from './insightsTopicReducer'
import {insightsConfidenceReducer} from './insightsConfidenceReducer'

export default combineReducers({
  login: loginReducer,
  quizMain: quizMainReducer,
  quizCreation: quizCreationReducer,
  tags: tagReducer,
  insightsTopic: insightsTopicReducer,
  insightsConfidence: insightsConfidenceReducer,
})
