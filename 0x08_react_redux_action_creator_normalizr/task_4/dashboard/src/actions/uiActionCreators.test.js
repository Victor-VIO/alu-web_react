import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from './uiActionTypes';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from './uiActionCreators';

describe('ui action creators', () => {
  it('login returns the LOGIN action with the user', () => {
    expect(login('test@test.com', 'secret')).toEqual({
      type: LOGIN,
      user: { email: 'test@test.com', password: 'secret' },
    });
  });

  it('logout returns the LOGOUT action', () => {
    expect(logout()).toEqual({ type: LOGOUT });
  });

  it('displayNotificationDrawer returns the DISPLAY_NOTIFICATION_DRAWER action', () => {
    expect(displayNotificationDrawer()).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
  });

  it('hideNotificationDrawer returns the HIDE_NOTIFICATION_DRAWER action', () => {
    expect(hideNotificationDrawer()).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
  });
});
