import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import setAuthedUser from '../../actions/authedUser'
import './header.css'

class Header extends PureComponent {
  constructor() {
    super()
    this.links = [['/', 'Home'], ['/add', 'New Question'], ['/scoreboard', 'Leader Board']]
  }

  handleLogout = () => {
    const { handleLogoutDispatch, history } = this.props
    handleLogoutDispatch()
    history.push('/')
  }

  mappedLinks = () =>
    this.links.map(link => (
      <NavLink
        key={link[0]}
        to={link[0]}
        exact
        activeClassName="menu-item-link--active"
        className="nav__item menu-item-link "
      >
        {link[1]}
      </NavLink>
    ))

  render() {
    const {
      currentUser: { name, avatarURL },
    } = this.props
    return (
      <header className="header">
        <div className="header__menu">
          <nav className="header__nav nav">{this.mappedLinks(this.links)}</nav>
          <div className="header__user-info user-info">
            <div className="user-info__greeting">Hello, {name}</div>
            <div
              className="user-info__avatar avatar"
              style={{ backgroundImage: `url(${avatarURL})` }}
            />
          </div>
          <div
            className="header__logout menu-item-link"
            onClick={this.handleLogout}
            onKeyDown={this.handleLogout}
          >
            Logout
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  const currentUser = Object.values(users).filter(user => user.id === authedUser)[0]
  return {
    currentUser,
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogoutDispatch: () => {
    dispatch(setAuthedUser(null))
  },
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
)
