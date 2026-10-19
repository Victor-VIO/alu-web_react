import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from './Notifications';
import {
  fetchNotifications,
  markAsAread,
  setNotificationFilter,
} from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

export class NotificationsContainer extends Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    const { fetchNotifications: fetch, ...props } = this.props;
    return <Notifications {...props} />;
  }
}

NotificationsContainer.propTypes = {
  fetchNotifications: PropTypes.func,
};

NotificationsContainer.defaultProps = {
  fetchNotifications: () => {},
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
