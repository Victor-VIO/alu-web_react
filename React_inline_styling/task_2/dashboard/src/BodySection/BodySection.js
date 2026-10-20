import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class BodySection extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className={css(styles.bodySection)}>
        <h2 className={css(styles.title)}>{title}</h2>
        {children}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  bodySection: {
    padding: '0 40px',
  },

  title: {
    color: '#e1354b',
  },
});

BodySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BodySection.defaultProps = {
  children: null,
};

export default BodySection;
