import notificationReducer from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import * as notificationsData from '../../notifications.json';

const data = notificationsData.default;

describe('notificationReducer', () => {
  it('returns the default state', () => {
    expect(notificationReducer(undefined, {}).toJS()).toEqual({
      filter: 'DEFAULT',
      notifications: {},
    });
  });

  it('stores every message as unread on FETCH_NOTIFICATIONS_SUCCESS', () => {
    const state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    const notifications = state.get('notifications');
    expect(notifications.size).toBe(14);
    expect(notifications.get('efb6c485-00f7-4fdf-97cc-5e12d14d6c41').toJS()).toEqual({
      guid: 'efb6c485-00f7-4fdf-97cc-5e12d14d6c41',
      isRead: false,
      type: 'default',
      value: 'Cursus risus at ultrices mi.',
    });
  });

  it('marks a notification as read', () => {
    let state = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });
    state = notificationReducer(state, {
      type: MARK_AS_READ,
      index: 'efb6c485-00f7-4fdf-97cc-5e12d14d6c41',
    });
    expect(
      state.getIn(['notifications', 'efb6c485-00f7-4fdf-97cc-5e12d14d6c41', 'isRead'])
    ).toBe(true);
  });

  it('sets the filter', () => {
    const state = notificationReducer(undefined, {
      type: SET_TYPE_FILTER,
      filter: NotificationTypeFilters.URGENT,
    });
    expect(state.get('filter')).toBe('URGENT');
  });
});
