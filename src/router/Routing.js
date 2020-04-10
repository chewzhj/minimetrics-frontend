import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginContainer from '../containers/LoginContainer'
import Dashboard from '../views/Dashboard'
import QuizMainContainer from '../containers/QuizMainContainer'
import QuizCreationContainer from '../containers/QuizCreationContainer'
import TagsContainer from '../containers/TagsContainer'
import InsightsTopicContainer from '../containers/InsightsTopicContainer'
import InsightsConfidenceContainer from '../containers/InsightsConfidenceContainer'
import TutorialInsightsTopic from '../tutorials/TutorialInsightsTopic'

import 'antd/dist/antd.css'
import '../assets/css/App.css';

const Routing = () => {
  return (
    <Switch>

      <Route path="/login" component={LoginContainer}/>
      <Route path="/index" component={Dashboard} />

      <Route path="/quiz/create" component={QuizCreationContainer} />
      <Route path="/quiz" component={QuizMainContainer} />
      <Route path="/tags" component={TagsContainer} />
      <Route path="/insights/topic" component={InsightsTopicContainer} />
      <Route path="/insights/confidence" component={InsightsConfidenceContainer} />

      <Route path="/tutorials/insights/topic" component={TutorialInsightsTopic} />

      {/* fall through */}
      <Route path="/" component={Fallthrough} />
    </Switch>
  )
}

const Fallthrough = () => <Redirect push to='/index' />

export default Routing
