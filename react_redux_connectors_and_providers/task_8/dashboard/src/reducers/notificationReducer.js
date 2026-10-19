import { Map, fromJS } from 'immutable';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
  NotificationTypeFilters,
} from '../actions/notificationActionTypes';
import { notificationsNormalizer } from '../schema/notifications';

export const initialState = Map({
  filter: NotificationTypeFilters.DEFAULT,
  loading: false,
  notifications: Map({}),
});

export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS: {
      const messages = notificationsNormalizer(action.data).entities.messages || {};
      const unread = {};
      Object.values(messages).forEach((message) => {
        unread[message.guid] = { ...message, isRead: false };
      });
      return state.mergeDeep(fromJS({ notifications: unread }));
    }
    case MARK_AS_READ:
      if (!state.hasIn(['notifications', action.index])) {
        return state;
      }
      return state.setIn(['notifications', action.index, 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case SET_LOADING_STATE:
      return state.set('loading', action.loading);
    default:
      return state;
  }
}
