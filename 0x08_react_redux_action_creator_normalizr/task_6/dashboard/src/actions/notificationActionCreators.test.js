import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from './notificationActionTypes';
import {
  markAsAread,
  setNotificationFilter,
  boundMarkAsAread,
  boundSetNotificationFilter,
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
