import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends Component {
  render() {
    return (
      <div className={css(styles.bodySectionWithMargin)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
  },
});

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

BodySectionWithMarginBottom.defaultProps = {
  children: null,
};

export default BodySectionWithMarginBottom;
