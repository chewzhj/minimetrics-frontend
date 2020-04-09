import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
import {loginReducer} from './loginReducer'
import {quizMainReducer} from './quizMainReducer'
import {quizCreationReducer} from './quizCreationReducer'
import {tagReducer} from './tagReducer'
import {insightsTopicReducer} from './insightsTopicReducer'
import {insightsConfidenceReducer} from './insightsConfidenceReducer'

export default combineReducers({
  counter: counterReducer,
  login: loginReducer,
  quizMain: quizMainReducer,
  quizCreation: quizCreationReducer,
  tags: tagReducer,
  insightsTopic: insightsTopicReducer,
  insightsConfidence: insightsConfidenceReducer,
})
