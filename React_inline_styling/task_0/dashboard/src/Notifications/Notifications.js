import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;

    return (
      <>
        <div className="menuItem">
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className="Notifications">
            <button
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
            >
              <img src={closeIcon} alt="close icon" width="10px" height="10px" />
            </button>
            {listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {listNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
