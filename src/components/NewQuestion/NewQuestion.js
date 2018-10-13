import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { OPTIONS } from '../../utils/CONST'
import { handleAddQuestion } from '../../actions/questions'
import './new-question.css'

class NewQuestion extends Component {
  constructor() {
    super()
    this.state = this.setInitialState()
  }

  setInitialState = () => {
    const tempState = {}
    OPTIONS.forEach(option => {
      tempState[option] = ''
    })
    return tempState
  }

  handleInput = e => {
    const { value, id } = e.target
    this.setState(() => ({
      [id]: value,
    }))
  }

  handleSubmit = e => {
    const { setQuestionAction, history } = this.props
    e.preventDefault()
    setQuestionAction(this.state)
      .then(() => history.push('/'))
      .catch(error => alert(`Something went wrong. Error: ${error}`))
  }

  render() {
    const stateOptions = this.state
    return (
      <div className="container new-question">
        <div className="container__header new-question__header">Create New Question</div>
        <div className="new-question__content">
          <div className="new-question__task-text">Complete the question</div>
          <div className="new-question__begin-text new-question-bold-text">Would You Rather...</div>
          <form className="new-question__form" onSubmit={this.handleSubmit}>
            {OPTIONS.map((option, index) => (
              <Fragment key={option}>
                {index !== 0 && (
                  <div className="new-question__or-text new-question-bold-text">OR</div>
                )}
                <input
                  type="text"
                  className="new-question__input input"
                  id={`${option}`}
                  placeholder="Enter option one text here..."
                  value={stateOptions[option]}
                  onChange={this.handleInput}
                />
              </Fragment>
            ))}
            <button
              className={`new-question__btn btn ${
                Object.values(this.state).includes('') ? 'btn--disabled' : 'btn--filled'
              }`}
              disabled={Object.values(this.state).includes('')}
              type="submit"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setQuestionAction: answer => dispatch(handleAddQuestion(answer)),
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(NewQuestion),
)
