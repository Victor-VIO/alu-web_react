import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const itemStyle = type === 'urgent' ? styles.urgent : styles.default;

    return (
      <li
        className={css(itemStyle, styles.item)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      >
        {html ? undefined : value}
      </li>
    );
  }
}

const screenSize = {
  small: '@media screen and (max-width: 900px)',
};

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
  },

  item: {
    [screenSize.small]: {
      width: '100%',
      boxSizing: 'border-box',
      listStyle: 'none',
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
    },
  },
});

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
