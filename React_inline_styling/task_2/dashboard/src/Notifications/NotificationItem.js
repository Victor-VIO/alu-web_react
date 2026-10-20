import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const itemStyle = type === 'urgent' ? styles.urgent : styles.default;

    return (
      <li
        className={css(itemStyle)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      >
        {html ? undefined : value}
      </li>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
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
