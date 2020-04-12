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
        {/* Dashboard (Main) Page */}
        <Route path="/index" component={DashboardContainer} />

        {/* Quiz Pages and Fallthrough */}
        <Route path="/quiz/create" component={QuizCreationContainer} />
        <Route exact path="/quiz" component={QuizMainContainer} />
        <Route path="/quiz" component={QuizFallthrough} />

        {/* Topic Page */}
        <Route exact path="/topic" component={TagsContainer} />

        {/* Insights Pages */}
        <Route exact path="/insights/topic" component={InsightsTopicContainer} />
        <Route exact path="/insights/confidence" component={InsightsConfidenceContainer} />

        {/* Tutorial Pages for Insight */}
        <Route exact path="/tutorials/insights/topic" component={TutorialInsightsTopic} />
        <Route exact path="/tutorials/insights/confidence" component={TutorialInsightsConfidence} />

        {/* fall through component to redirect back to index*/}
        <Route path="/" component={Fallthrough} />
      </Switch>
    )
  }
}

const QuizFallthrough = () => <Redirect push to='/quiz' />

const FallthroughLoggedOut = () => <Redirect push to='/login' />
const Fallthrough = () => <Redirect push to='/index' />

export default Routing
