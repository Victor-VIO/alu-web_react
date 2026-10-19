import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { login, loginSuccess, loginFailure, logout } from '../actions/uiActionCreators';

describe('uiReducer', () => {
  it('returns the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('returns the initial state when an unrelated action is passed', () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(initialState.toJS());
  });

  it('sets isNotificationDrawerVisible on DISPLAY_NOTIFICATION_DRAWER', () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.get('isNotificationDrawerVisible')).toBe(true);
  });

  it('sets isUserLoggedIn on LOGIN_SUCCESS, LOGIN_FAILURE and LOGOUT', () => {
    let state = uiReducer(undefined, loginSuccess());
    expect(state.get('isUserLoggedIn')).toBe(true);
    state = uiReducer(state, logout());
    expect(state.get('isUserLoggedIn')).toBe(false);
    state = uiReducer(uiReducer(undefined, loginSuccess()), loginFailure());
    expect(state.get('isUserLoggedIn')).toBe(false);
  });
});

describe('uiReducer LOGIN and LOGOUT', () => {
  it('sets the user passed with the LOGIN action', () => {
    const state = uiReducer(undefined, login('test@test.com', 'secret'));
    expect(state.get('user')).toEqual({ email: 'test@test.com', password: 'secret' });
  });

  it('sets the user to null on LOGOUT', () => {
    let state = uiReducer(undefined, login('test@test.com', 'secret'));
    state = uiReducer(state, loginSuccess());
    state = uiReducer(state, logout());
    expect(state.get('user')).toBeNull();
    expect(state.get('isUserLoggedIn')).toBe(false);
  });
});
