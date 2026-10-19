import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './uiActionTypes';
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  loginRequest,
  boundLogin,
  boundLogout,
  boundDisplayNotificationDrawer,
  boundHideNotificationDrawer,
} from './uiActionCreators';

const mockStore = configureStore([thunk]);

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

  it('loginSuccess returns the LOGIN_SUCCESS action', () => {
    expect(loginSuccess()).toEqual({ type: LOGIN_SUCCESS });
  });

  it('loginFailure returns the LOGIN_FAILURE action', () => {
    expect(loginFailure()).toEqual({ type: LOGIN_FAILURE });
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

describe('loginRequest', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches LOGIN and LOGIN_SUCCESS when the API returns the right response', () => {
    fetchMock.getOnce('/login-success.json', {
      first_name: 'Johann',
      last_name: 'Salva',
      email: 'johann.salva@holberton.nz',
      profile_picture: 'http://placehold.it/32x32',
    });
    const store = mockStore({});

    return store.dispatch(loginRequest('test@test.com', 'secret')).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOGIN, user: { email: 'test@test.com', password: 'secret' } },
        { type: LOGIN_SUCCESS },
      ]);
    });
  });

  it('dispatches LOGIN and LOGIN_FAILURE when the API query fails', () => {
    fetchMock.getOnce('/login-success.json', 500);
    const store = mockStore({});

    return store.dispatch(loginRequest('test@test.com', 'secret')).then(() => {
      expect(store.getActions()).toEqual([
        { type: LOGIN, user: { email: 'test@test.com', password: 'secret' } },
        { type: LOGIN_FAILURE },
      ]);
    });
  });
});
