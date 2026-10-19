import { createSelector } from 'reselect';
import { NotificationTypeFilters } from '../actions/notificationActionTypes';

export const filterTypeSelected = (state) => state.get('filter');

export const getNotifications = (state) => state.get('notifications');

export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {
    const unread = notifications.valueSeq().filter((notification) => !notification.get('isRead'));

    if (filter === NotificationTypeFilters.URGENT) {
      return unread.filter((notification) => notification.get('type') === 'urgent');
    }
    return unread;
  }
);
