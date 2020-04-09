import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import DefaultReactApp from '../assets/js/App'
import CounterContainer from '../containers/CounterContainer'
import LoginContainer from '../containers/LoginContainer'
import Dashboard from '../views/Dashboard'
import Users from '../views/Users'
import QuizMainContainer from '../containers/QuizMainContainer'
import QuizCreationContainer from '../containers/QuizCreationContainer'
import TagsContainer from '../containers/TagsContainer'
import InsightsMain from '../views/InsightsMain'
import InsightsTopicContainer from '../containers/InsightsTopicContainer'
import InsightsQuiz from '../views/InsightsQuiz'
import InsightsStudent from '../views/InsightsStudent'
import InsightsConfidence from '../views/InsightsConfidence'
import TutorialInsightsTopic from '../tutorials/TutorialInsightsTopic'
import StudentQuizAttempt from '../views/StudentQuizAttempt'
import StudentQuizList from '../views/StudentQuizList'
import StudentQuizResult from '../views/StudentQuizResult'
import SideBar from '../components/SideBar'

const Routing = () => {
  return (
    <Switch>

      <Route path="/login" component={LoginContainer}/>
      <Route path="/index" component={Dashboard} />

      <Route path="/quiz/create" component={QuizCreationContainer} />
      <Route path="/quiz" component={QuizMainContainer} />
      <Route path="/tags" component={TagsContainer} />
      <Route path="/insights/overview" component={InsightsMain} />
      <Route path="/insights/topic" component={InsightsTopicContainer} />
      <Route path="/insights/quiz" component={InsightsQuiz} />
      <Route path="/insights/student" component={InsightsStudent} />
      <Route path="/insights/confidence" component={InsightsConfidence} />

      <Route path="/studentquiz/attempt" component={StudentQuizAttempt} />
      <Route path="/studentquiz/result" component={StudentQuizResult} />
      <Route path="/studentquiz" component={StudentQuizList} />

      <Route path="/tutorials/insights/topic" component={TutorialInsightsTopic} />

      <Route path="/counter" component={CounterContainer}/>
      <Route path="/react-default" component={DefaultReactApp}/>

      {/* fall through */}
      <Route path="/" component={Fallthrough} />
    </Switch>
  )
}

const Fallthrough = () => <Redirect push to='/index' />

export default Routing
