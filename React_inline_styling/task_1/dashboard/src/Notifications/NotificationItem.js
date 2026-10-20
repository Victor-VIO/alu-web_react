import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const itemColors = {
  default: { color: 'blue' },
  urgent: { color: 'red' },
};

class NotificationItem extends PureComponent {
  render() {
    const { type, html, value, markAsRead, id } = this.props;
    const itemStyle = itemColors[type] || itemColors.default;

    if (html) {
      return (
        <li
          style={itemStyle}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        ></li>
      );
    }

    return (
      <li style={itemStyle} data-notification-type={type} onClick={() => markAsRead(id)}>
        {value}
      </li>
    );
  }
}

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
