import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFullYear, getFooterCopy } from '../utils/utils';
import './Footer.css';

export function Footer({ user }) {
  return (
    <div className="App-footer">
      <p>
        Copyright {getFullYear()} - {getFooterCopy(true)}
      </p>
      {user && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

Footer.defaultProps = {
  user: null,
};

export function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps)(Footer);
