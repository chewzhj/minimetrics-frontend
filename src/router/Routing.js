import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginContainer from '../containers/LoginContainer'
import DashboardContainer from '../containers/DashboardContainer'
import QuizMainContainer from '../containers/QuizMainContainer'
import QuizCreationContainer from '../containers/QuizCreationContainer'
import TagsContainer from '../containers/TagsContainer'
import InsightsTopicContainer from '../containers/InsightsTopicContainer'
import InsightsConfidenceContainer from '../containers/InsightsConfidenceContainer'
import TutorialInsightsTopic from '../tutorials/TutorialInsightsTopic'
import TutorialInsightsConfidence from '../tutorials/TutorialInsightsConfidence'

import 'antd/dist/antd.css'
import '../assets/css/App.css';

const sessionKey = sessionStorage.getItem('sessionKey')

const Routing = () => {

  if (sessionKey === null) {
    return (
      <Switch>
        <Route path="/login" component={LoginContainer}/>

        {/* fall through */}
        <Route path="/" component={FallthroughLoggedOut} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/index" component={DashboardContainer} />

        <Route path="/quiz/create" component={QuizCreationContainer} />
        <Route path="/quiz" component={QuizMainContainer} />
        <Route path="/tags" component={TagsContainer} />
        <Route path="/insights/topic" component={InsightsTopicContainer} />
        <Route path="/insights/confidence" component={InsightsConfidenceContainer} />

        <Route path="/tutorials/insights/topic" component={TutorialInsightsTopic} />
        <Route path="/tutorials/insights/confidence" component={TutorialInsightsConfidence} />

        {/* fall through */}
        <Route path="/" component={Fallthrough} />
      </Switch>
    )
  }
}

const FallthroughLoggedOut = () => <Redirect push to='/login' />
const Fallthrough = () => <Redirect push to='/index' />

export default Routing
