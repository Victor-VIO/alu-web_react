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
  boundLogin,
  boundLogout,
  boundDisplayNotificationDrawer,
  boundHideNotificationDrawer,
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

describe('bound ui action creators', () => {
  it('boundLogin dispatches the LOGIN action', () => {
    const dispatch = jest.fn();
    boundLogin(dispatch)('test@test.com', 'secret');
    expect(dispatch).toHaveBeenCalledWith({
      type: LOGIN,
      user: { email: 'test@test.com', password: 'secret' },
    });
  });

  it('boundLogout dispatches the LOGOUT action', () => {
    const dispatch = jest.fn();
    boundLogout(dispatch)();
    expect(dispatch).toHaveBeenCalledWith({ type: LOGOUT });
  });

  it('boundDisplayNotificationDrawer dispatches the DISPLAY_NOTIFICATION_DRAWER action', () => {
    const dispatch = jest.fn();
    boundDisplayNotificationDrawer(dispatch)();
    expect(dispatch).toHaveBeenCalledWith({ type: DISPLAY_NOTIFICATION_DRAWER });
  });

  it('boundHideNotificationDrawer dispatches the HIDE_NOTIFICATION_DRAWER action', () => {
    const dispatch = jest.fn();
    boundHideNotificationDrawer(dispatch)();
    expect(dispatch).toHaveBeenCalledWith({ type: HIDE_NOTIFICATION_DRAWER });
  });
});
