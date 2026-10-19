import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from '../actions/notificationActionCreators';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';
import './Notifications.css';

export class Notifications extends PureComponent {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const {
      displayDrawer,
      listNotifications,
      handleDisplayDrawer,
      handleHideDrawer,
      markNotificationAsRead,
      setNotificationFilter: setFilter,
    } = this.props;

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
                  onClick={() => setFilter(NotificationTypeFilters.URGENT)}
                >
                  ‼️
                </button>
                <button
                  type="button"
                  className="filterButton"
                  onClick={() => setFilter(NotificationTypeFilters.DEFAULT)}
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
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  fetchNotifications: PropTypes.func,
  setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: Map({}),
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {},
};

export function mapStateToProps(state) {
  return {
    listNotifications: getUnreadNotificationsByType(state.notifications),
  };
}

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
