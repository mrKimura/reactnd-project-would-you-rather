import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { handleInitialData } from "../../actions/shared";
import Header from "../Header/Header";
import LoginScreen from "../LoginScreen/LoginScreen";
import Question from "../Question/Question";
import Dashboard from "../Dashboard/Dashboard";
import NewQuestion from "../NewQuestion/NewQuestion";
import ScoreBoard from "../Scoreboard/ScoreBoard";
import Page404 from "../Page404/Page404";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authedUser === null ? (
            <Route path="/" component={LoginScreen} />
          ) : (
            <Fragment>
              <Header />
              <main className="main">
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/add" exact component={NewQuestion} />
                  <Route path="/scoreboard" exact component={ScoreBoard} />
                  <Route path="/question/:question_id" component={Question} />
                  <Route component={Page404} />
                </Switch>
              </main>
            </Fragment>
          )}
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(App);
