import React, { Component } from 'react';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../App/AppContext';
import './Header.css';

class Header extends Component {
  render() {
    const { user, logOut } = this.context;

    return (
      <>
        <div className="App-header">
          <img src={logo} alt="Holberton logo" />
          <h1>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
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

Header.contextType = AppContext;

export default Header;
