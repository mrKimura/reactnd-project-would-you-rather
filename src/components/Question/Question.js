import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './question.css'
import { OPTIONS } from '../../utils/CONST'
import QuestionUnAnswered from './QuestionUnAnswered'
import QuestionAnswered from './QuestionAnswered'
import { handleAnswerQuestion } from '../../actions/questions'
import Page404 from '../Page404/Page404'

const getQuestionOptions = question => {
  const options = []
  OPTIONS.forEach(o => (question[o] ? options.push(question[o]) : null))
  return options
}

const Question = ({
  questionIsAnswered,
  setQuestionAnswerAction,
  authedUser,
  question,
  author,
}) => {
  if (question === null) return <Page404 />
  const { name, avatarURL } = author

  return (
    <div className="question container">
      <div className="container__header">{name} asks:</div>
      <div className="question__body">
        <div className="question__avatar-container">
          <div
            className="question__avatar avatar"
            style={{ backgroundImage: `url(${avatarURL})` }}
          />
        </div>
        <div className="question__block">
          {questionIsAnswered ? (
            <QuestionAnswered options={getQuestionOptions(question)} authedUser={authedUser} />
          ) : (
            <QuestionUnAnswered
              options={getQuestionOptions(question)}
              setQuestionAnswer={setQuestionAnswerAction}
              id={question.id}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const getQuestionAuthor = (users, question) =>
  Object.values(users).filter(user => user.id === question.author)[0]

const isQuestionAnswered = (authedUser, question) => {
  const allVotes = []
  OPTIONS.forEach(o => (question[o] ? allVotes.push(...question[o].votes) : null))
  return allVotes.includes(authedUser)
}

const mapStateToProps = ({ authedUser, questions, users }, navigation) => {
  const question = questions[navigation.match.params.question_id]
  if (question) {
    return {
      question,
      author: getQuestionAuthor(users, question),
      questionIsAnswered: isQuestionAnswered(authedUser, question),
      authedUser,
    }
  }
  return {
    question: null,
  }
}

const mapDispatchToProps = dispatch => ({
  setQuestionAnswerAction: (answer, id) => dispatch(handleAnswerQuestion(answer, id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Question),
)
