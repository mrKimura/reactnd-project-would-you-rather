import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const DashBoardItem = ({ name, avatarURL, id, text }) => (
  <div className="dashboard__item dash-item container">
    <div className="container__header dash-item__header">{name} asks:</div>
    <div className="dash-item__body">
      <div className="dash-item__avatar-container">
        <div
          className="dash-item__avatar avatar"
          style={{ backgroundImage: `url(${avatarURL})` }}
        />
      </div>
      <div className="dash-item__content">
        <div className="dash-item__heading">Would you rather</div>
        <div className="dash-item__question-text dash-question">
          <span className="dash-question__dotes">...</span>
          <span className="dash-question__answer">{text}</span>
        </div>
        <Link to={`/question/${id}`} className="dashboard__btn btn btn--no-filled">
          View Poll
        </Link>
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id]
  const author = Object.values(users).filter(user => user.id === question.author)[0]
  return {
    id,
    text: question.optionOne.text,
    name: author.name,
    avatarURL: author.avatarURL,
  }
}
export default connect(mapStateToProps)(DashBoardItem)
