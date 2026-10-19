import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/holberton-logo.jpg';
import { logout } from '../actions/uiActionCreators';
import './Header.css';

export class Header extends Component {
  render() {
    const { user, logout: logOut } = this.props;

    return (
      <>
        <div className="App-header">
          <img src={logo} alt="Holberton logo" />
          <h1>School dashboard</h1>
        </div>
        {user && (
          <p id="logoutSection">
            Welcome <strong>{user.email}</strong> (
            <a
              href="#"
              className="logoutLink"
              onClick={(event) => {
                event.preventDefault();
                logOut();
              }}
            >
              logout
            </a>
            )
          </p>
        )}
      </>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  logout: PropTypes.func,
};

Header.defaultProps = {
  user: null,
  logout: () => {},
};

export function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, { logout })(Header);
