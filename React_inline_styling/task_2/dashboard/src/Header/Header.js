import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="Holberton logo" />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '3px solid #e1354b',
  },

  logo: {
    width: '200px',
    height: '200px',
  },

  title: {
    color: '#e1354b',
    marginLeft: '20px',
  },
});

export default Header;
