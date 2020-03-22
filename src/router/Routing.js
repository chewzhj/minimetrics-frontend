import React from 'react'
import {Route, Switch} from 'react-router-dom'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'
import LoginContainer from '../containers/LoginContainer'
import Dashboard from '../views/Dashboard'
import Users from '../views/Users'
import QuizMain from '../views/QuizMain'
import TagsMain from '../views/TagsMain'
import InsightsMain from '../views/InsightsMain'
import SideBar from '../components/SideBar'

const Routing = () => {
  return (
    <Switch>

      {/* <Route path="/index" component={SideBar}/> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={Users} />
      <Route path="/quizzes" component={QuizMain} />
      <Route path="/tags" component={TagsMain} />
      <Route path="/insights" component={InsightsMain} />


      <Route path="/counter" component={CounterContainer}/>
      <Route path="/react-default" component={DefaultReactApp}/>

      {/* fall through */}
      <Route path="/" component={LoginContainer}/>
    </Switch>
  )
}

export default Routing
