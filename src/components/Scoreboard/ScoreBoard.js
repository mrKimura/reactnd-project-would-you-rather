import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './score-board.css'
import ScoreBoardItem from './ScoreBoardItem'

const ScoreBoard = ({ userList }) => (
  <div className="scoreboard">
    {userList.map(u => (
      <ScoreBoardItem key={u.id} user={u} />
    ))}
  </div>
)

const userScore = user => user.questions.length + Object.keys(user.answers).length

const addPlace = userList => {
  let score = null
  let place = 0
  return userList.map(u => {
    const currentScore = userScore(u)
    if (currentScore !== score) {
      place++
      score = currentScore
    }
    const answers = Object.keys(u.answers).length
    const questions = u.questions.length
    return {
      ...u,
      answers,
      questions,
      place,
    }
  })
}

const gerUserListSorted = users => {
  const userList = Object.keys(users)
    .sort((a, b) => userScore(users[b]) - userScore(users[a]))
    .map(u => users[u])
  return addPlace(userList)
}

const mapStateToProps = ({ users }) => ({
  userList: gerUserListSorted(users),
})

export default withRouter(connect(mapStateToProps)(ScoreBoard))
