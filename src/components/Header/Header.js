import React, {Component} from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import setAuthedUser from "../../actions/authedUser";
import "./header.css";

class Header extends Component {
  handleLogout = () => {
    const { handleLogoutDispatch, history } = this.props;
    handleLogoutDispatch();
    history.push("/");
  };
  
  render() {
    const { name, avatarURL } = this.props.currentUser;
    return (
      <header className="header">
        <div className="header__menu">
          <nav className="header__nav nav">
            <NavLink
              to="/"
              exact
              activeClassName="menu-item-link--active"
              className="nav__item menu-item-link "
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              activeClassName="menu-item-link--active"
              className="nav__item menu-item-link"
            >
              New Question
            </NavLink>
            <NavLink
              to="/scoreboard"
              activeClassName="menu-item-link--active"
              className="nav__item menu-item-link"
            >
              Leader Board
            </NavLink>
          </nav>
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
          >
            Logout
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  const currentUser = Object.values(users).filter(
    user => user.id === authedUser
  )[0];
  return {
    currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogoutDispatch: userId => {
      dispatch(setAuthedUser(null));
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
