import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters,
} from './notificationActionTypes';
import {
  markAsAread,
  setNotificationFilter,
  boundMarkAsAread,
  boundSetNotificationFilter,
  setLoadingState,
  setNotifications,
  fetchNotifications,
} from './notificationActionCreators';

describe('notification action creators', () => {
  it('markAsAread returns the MARK_AS_READ action', () => {
    expect(markAsAread(1)).toEqual({ type: MARK_AS_READ, index: 1 });
  });

  it('setNotificationFilter returns the SET_TYPE_FILTER action', () => {
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'DEFAULT',
    });
  });

  it('setNotificationFilter works with the URGENT filter', () => {
    expect(setNotificationFilter(NotificationTypeFilters.URGENT)).toEqual({
      type: SET_TYPE_FILTER,
      filter: 'URGENT',
    });
  });
});

describe('bound notification action creators', () => {
  it('boundMarkAsAread dispatches the MARK_AS_READ action', () => {
    const dispatch = jest.fn();
    boundMarkAsAread(dispatch)(1);
    expect(dispatch).toHaveBeenCalledWith({ type: MARK_AS_READ, index: 1 });
  });

  it('boundSetNotificationFilter dispatches the SET_TYPE_FILTER action', () => {
    const dispatch = jest.fn();
    boundSetNotificationFilter(dispatch)(NotificationTypeFilters.URGENT);
    expect(dispatch).toHaveBeenCalledWith({ type: SET_TYPE_FILTER, filter: 'URGENT' });
  });
});

describe('notification loading action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('setLoadingState returns the SET_LOADING_STATE action', () => {
    expect(setLoadingState(true)).toEqual({ type: SET_LOADING_STATE, loading: true });
  });

  it('setNotifications returns the FETCH_NOTIFICATIONS_SUCCESS action', () => {
    const data = [{ id: '1' }];
    expect(setNotifications(data)).toEqual({ type: FETCH_NOTIFICATIONS_SUCCESS, data });
  });

  it('fetchNotifications dispatches the loading state and the notifications', () => {
    const data = [{ id: '1', author: { id: 'a' }, context: { guid: 'g' } }];
    fetchMock.getOnce('/notifications.json', data);
    const store = configureStore([thunk])({});

    return store.dispatch(fetchNotifications()).then(() => {
      expect(store.getActions()).toEqual([
        { type: SET_LOADING_STATE, loading: true },
        { type: FETCH_NOTIFICATIONS_SUCCESS, data },
        { type: SET_LOADING_STATE, loading: false },
      ]);
    });
  });
});
