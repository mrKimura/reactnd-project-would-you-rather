import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ReactResponsiveSelect.css'
import './login-screen.css'
import ReactResponsiveSelect from 'react-responsive-select'
import setAuthedUser from '../../actions/authedUser'

const caretIcon = (
  <svg className="caret-icon" width="12px" height="6px">
    <path d="M6 6L0 .8.7 0 6 4.7 11.3 0l.7.8z" />
  </svg>
)

class LoginScreen extends Component {
  state = {
    selectedValue: 'null',
  }

  handleSingleSelectChange = newValue => {
    this.setState(() => ({
      selectedValue: newValue.value,
    }))
  }

  handleSubmit = e => {
    const { handleUserLogin } = this.props
    const { selectedValue } = this.state
    e.preventDefault()
    handleUserLogin(selectedValue)
  }

  render() {
    const { selectedValue } = this.state
    const { userList } = this.props

    return (
      <main className="main">
        <div className="container login">
          <div className="container__header login__header">
            Welcome to
            <br />
            Would You Rather App
          </div>
          <form className="login__form" onSubmit={this.handleSubmit}>
            <ReactResponsiveSelect
              name="select"
              noSelectionLabel="Select User..."
              options={userList}
              caretIcon={caretIcon}
              selectedValue={selectedValue}
              onChange={this.handleSingleSelectChange}
            />
            <button
              className={`login__btn btn ${
                selectedValue === 'null' ? 'btn--disabled' : 'btn--filled'
              }`}
              disabled={selectedValue === 'null'}
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    )
  }
}

const selectOptionMarkup = (text, avatarURL) => (
  <div className="formatted-option">
    <div className="login__avatar avatar" style={{ backgroundImage: `url(${avatarURL})` }} />
    <span>{text}</span>
  </div>
)

const getSelectItems = array =>
  array.map(i => ({
    value: i.id,
    text: i.name,
    markup: selectOptionMarkup(i.name, i.avatarURL),
  }))

const mapStateToProps = ({ users }) => ({
  userList: getSelectItems(Object.values(users)),
})

const mapDispatchToProps = dispatch => ({
  handleUserLogin: userId => {
    dispatch(setAuthedUser(userId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
