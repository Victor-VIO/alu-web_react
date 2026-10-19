import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { loginSuccess, loginFailure, logout } from '../actions/uiActionCreators';

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
