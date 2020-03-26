import React from 'react'
import {Route, Switch} from 'react-router-dom'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'
import LoginContainer from '../containers/LoginContainer'
import Dashboard from '../views/Dashboard'
import Users from '../views/Users'
import QuizMainContainer from '../containers/QuizMainContainer'
import QuizCreationContainer from '../containers/QuizCreationContainer'
import TagsMain from '../views/TagsMain'
import InsightsMain from '../views/InsightsMain'
import InsightsTopic from '../views/InsightsTopic'
import InsightsQuiz from '../views/InsightsQuiz'
import InsightsStudent from '../views/InsightsStudent'
import InsightsConfidence from '../views/InsightsConfidence'
import SideBar from '../components/SideBar'

const Routing = () => {
  return (
    <Switch>

      <Route path="/login" component={LoginContainer}/>
      {/* <Route path="/index" component={SideBar}/> */}
      <Route path="/users" component={Users} />

      <Route path="/quiz/create" component={QuizCreationContainer} />
      <Route path="/quiz" component={QuizMainContainer} />
      <Route path="/tags" component={TagsMain} />
      <Route path="/insights/overview" component={InsightsMain} />
      <Route path="/insights/topic" component={InsightsTopic} />
      <Route path="/insights/quiz" component={InsightsQuiz} />
      <Route path="/insights/student" component={InsightsStudent} />
      <Route path="/insights/confidence" component={InsightsConfidence} />


      <Route path="/counter" component={CounterContainer}/>
      <Route path="/react-default" component={DefaultReactApp}/>

      {/* fall through */}
      <Route path="/" component={Dashboard} />
    </Switch>
  )
}

export default Routing
