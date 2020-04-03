import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
import {loginReducer} from './loginReducer'
import {quizMainReducer} from './quizMainReducer'
import {quizCreationReducer} from './quizCreationReducer'
import {insightsTopicReducer} from './insightsTopicReducer'

export default combineReducers({
  counter: counterReducer,
  login: loginReducer,
  quizMain: quizMainReducer,
  quizCreation: quizCreationReducer,
  insightsTopic: insightsTopicReducer,
})
