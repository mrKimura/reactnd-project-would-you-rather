import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import DashBoardItem from "./DashBoardItem";
import './dashboard.css'

class Dashboard extends Component {
  state = {
    activeQuestions: "UnAnswered"
  };

  handleListChange = e => {
    const activeQuestions = e.target.id;
    this.setState(() => ({
      activeQuestions
    }));
  };

  render() {
    const { activeQuestions } = this.state;
    const { answeredQuestions, unAnsweredQuestions } = this.props;
    return (
      <div className="dashboard container">
        <div className="dashboard__header dashboard-header">
          <a
            className={`dashboard-header__item ${
              activeQuestions === "UnAnswered"
                ? "dashboard-header__item--active"
                : ""
            }`}
            id="UnAnswered"
            onClick={this.handleListChange}
          >
            Unanswered Questions
          </a>
          <a
            className={`dashboard-header__item ${
              activeQuestions === "Answered"
                ? "dashboard-header__item--active"
                : ""
            }`}
            id="Answered"
            onClick={this.handleListChange}
          >
            Answered Questions
          </a>
        </div>
        <div className="dashboard__questions">
          {activeQuestions === "UnAnswered"
            ? unAnsweredQuestions.map(q => (
                <DashBoardItem key={q} id={q} />
              ))
            : answeredQuestions.map(q => (
                <DashBoardItem key={q} id={q} />
              ))}
        </div>
      </div>
    );
  }
}

const questionsSort = (items, allQuestions) =>
  items.sort((a, b) => allQuestions[b].timestamp - allQuestions[a].timestamp);

const getQuestionList = (allQuestions, authedUser) => {
  const answeredQuestions = [];
  const unAnsweredQuestions = [];
  Object.keys(allQuestions).forEach(questionIndex => {
    [
      ...allQuestions[questionIndex].optionOne.votes,
      ...allQuestions[questionIndex].optionTwo.votes
    ].includes(authedUser)
      ? answeredQuestions.push(questionIndex)
      : unAnsweredQuestions.push(questionIndex);
  });
  return {
    unAnswered: questionsSort(unAnsweredQuestions, allQuestions),
    answered: questionsSort(answeredQuestions, allQuestions)
  };
};

const mapStateToProps = ({ questions, authedUser }) => {
  const questionsForDashboard = getQuestionList(questions, authedUser);
  return {
    unAnsweredQuestions: questionsForDashboard.unAnswered,
    answeredQuestions: questionsForDashboard.answered,
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
