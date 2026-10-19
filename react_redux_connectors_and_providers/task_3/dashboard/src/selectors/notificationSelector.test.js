import notificationReducer from '../reducers/notificationReducer';
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from './notificationSelector';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ } from '../actions/notificationActionTypes';
import * as notificationsData from '../../notifications.json';

const data = notificationsData.default;

describe('notification selectors', () => {
  const loaded = notificationReducer(undefined, { type: FETCH_NOTIFICATIONS_SUCCESS, data });

  it('filterTypeSelected returns the filter', () => {
    expect(filterTypeSelected(loaded)).toBe('DEFAULT');
  });

  it('getNotifications returns the notifications Map', () => {
    expect(getNotifications(loaded).size).toBe(14);
  });

  it('getUnreadNotifications returns only the unread notifications', () => {
    const state = notificationReducer(loaded, {
      type: MARK_AS_READ,
      index: 'efb6c485-00f7-4fdf-97cc-5e12d14d6c41',
    });
    const unread = getUnreadNotifications(state);
    expect(unread.count()).toBe(13);
    expect(unread.some((n) => n.get('guid') === 'efb6c485-00f7-4fdf-97cc-5e12d14d6c41')).toBe(false);
  });
});
