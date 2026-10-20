import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
  return (
    <div className={css(styles.body)}>
      <p>Login to access the full dashboard</p>
      <div className={css(styles.field)}>
        <label htmlFor="email" className={css(styles.label)}>Email: </label>
        <input type="email" id="email" name="email" className={css(styles.input)} />
      </div>
      <div className={css(styles.field)}>
        <label htmlFor="password" className={css(styles.label)}>Password: </label>
        <input type="password" id="password" name="password" className={css(styles.input)} />
      </div>
      <button className={css(styles.button)}>OK</button>
    </div>
  );
}

const screenSize = {
  small: '@media screen and (max-width: 900px)',
};

const styles = StyleSheet.create({
  body: {
    padding: '40px',
  },

  field: {
    display: 'inline-block',
    [screenSize.small]: {
      display: 'block',
      marginBottom: '8px',
    },
  },

  label: {
    marginRight: '5px',
  },

  input: {
    marginRight: '10px',
  },

  button: {
    [screenSize.small]: {
      display: 'block',
    },
  },
});

export default Login;
