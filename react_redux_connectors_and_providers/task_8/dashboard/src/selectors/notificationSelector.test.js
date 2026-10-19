import notificationReducer from '../reducers/notificationReducer';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType,
} from './notificationSelector';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import * as notificationsData from '../../notifications.json';

const data = notificationsData.default;

describe('notification selectors', () => {
  const loaded = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
  const oneRead = notificationReducer(loaded, {
    type: MARK_AS_READ,
    index: 'cd1a09cf-ad6e-4478-9662-18a292807e2e',
  });

  it('filterTypeSelected returns the filter', () => {
    expect(filterTypeSelected(loaded)).toBe('DEFAULT');
  });

  it('getNotifications returns the notifications Map', () => {
    expect(getNotifications(loaded).size).toBe(14);
  });

  it('returns every unread notification with the DEFAULT filter', () => {
    const unread = getUnreadNotificationsByType(oneRead);
    expect(unread.count()).toBe(13);
    expect(unread.every((n) => !n.get('isRead'))).toBe(true);
  });

  it('returns the unread urgent notifications with the URGENT filter', () => {
    const state = notificationReducer(oneRead, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    const unread = getUnreadNotificationsByType(state);
    expect(unread.count()).toBe(6);
    expect(unread.every((n) => n.get('type') === 'urgent' && !n.get('isRead'))).toBe(true);
  });

  it('is memoized', () => {
    expect(getUnreadNotificationsByType(oneRead)).toBe(getUnreadNotificationsByType(oneRead));
  });
});
