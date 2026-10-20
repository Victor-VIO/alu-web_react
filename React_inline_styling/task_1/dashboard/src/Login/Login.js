import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
  return (
    <div className={css(styles.body)}>
      <p>Login to access the full dashboard</p>
      <label htmlFor="email" className={css(styles.label)}>Email: </label>
      <input type="email" id="email" name="email" className={css(styles.input)} />
      <label htmlFor="password" className={css(styles.label)}>Password: </label>
      <input type="password" id="password" name="password" className={css(styles.input)} />
      <button>OK</button>
    </div>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: '40px',
  },

  label: {
    marginRight: '5px',
  },

  input: {
    marginRight: '10px',
  },
});

export default Login;
