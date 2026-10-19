import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
import './Notifications.css';

function Notifications({
  displayDrawer,
  listNotifications,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead,
  setNotificationFilter,
}) {
  return (
    <>
      <div className="menuItem" onClick={handleDisplayDrawer}>
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
            onClick={handleHideDrawer}
          >
            <img src={closeIcon} alt="close icon" width="10px" height="10px" />
          </button>
          {listNotifications.count() === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>
              <button
                type="button"
                className="filterButton"
                onClick={() => setNotificationFilter(NotificationTypeFilters.URGENT)}
              >
                ‼️
              </button>
              <button
                type="button"
                className="filterButton"
                onClick={() => setNotificationFilter(NotificationTypeFilters.DEFAULT)}
              >
                💠
              </button>
              <ul>
                {listNotifications
                  .valueSeq()
                  .map((notification) => (
                    <NotificationItem
                      key={notification.get('guid')}
                      id={notification.get('guid')}
                      type={notification.get('type')}
                      value={notification.get('value')}
                      markAsRead={markNotificationAsRead}
                    />
                  ))
                  .toArray()}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: Map({}),
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  setNotificationFilter: () => {},
};

export default Notifications;
