import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { handleInitialData } from '../../actions/shared'
import Header from '../Header/Header'
import LoginScreen from '../LoginScreen/LoginScreen'
import Question from '../Question/Question'
import Dashboard from '../Dashboard/Dashboard'
import NewQuestion from '../NewQuestion/NewQuestion'
import ScoreBoard from '../Scoreboard/ScoreBoard'
import Page404 from '../Page404/Page404'

class App extends Component {
  constructor() {
    super()
    this.routes = [['/', Dashboard], ['/add', NewQuestion], ['/scoreboard', ScoreBoard]]
  }

  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  mappedRoutes = () =>
    this.routes.map(route => <Route key={route[0]} path={route[0]} exact component={route[1]} />)

  render() {
    const { authedUser } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {authedUser ? (
            <Fragment>
              <Header />
              <main className="main">
                <Switch>
                  {this.mappedRoutes()}
                  <Route path="/question/:question_id" component={Question} />
                  <Route component={Page404} />
                </Switch>
              </main>
            </Fragment>
          ) : (
            <Route path="/" component={LoginScreen} />
          )}
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
})

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(handleInitialData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
