import React from 'react'
import {Route, Switch} from 'react-router-dom'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'
import LoginContainer from '../containers/LoginContainer'

const Routing = () => {
  return (
    <Switch>

      <Route path="/counter" component={CounterContainer}/>
      <Route path="/react-default" component={DefaultReactApp}/>

      {/* fall through */}
      <Route path="/" component={LoginContainer}/>
    </Switch>
  )
}

export default Routing
