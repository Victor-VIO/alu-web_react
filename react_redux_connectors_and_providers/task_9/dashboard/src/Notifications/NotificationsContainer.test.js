import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { NotificationsContainer, mapStateToProps } from './NotificationsContainer';
import Notifications from './Notifications';

describe('NotificationsContainer', () => {
  it('fetches the notifications when it is mounted', () => {
    const fetchNotifications = jest.fn();
    shallow(<NotificationsContainer fetchNotifications={fetchNotifications} />);
    expect(fetchNotifications).toHaveBeenCalledTimes(1);
  });

  it('renders Notifications and passes the props to it', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <NotificationsContainer displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );
    const notifications = wrapper.find(Notifications);
    expect(notifications).toHaveLength(1);
    expect(notifications.prop('displayDrawer')).toBe(true);
    expect(notifications.prop('handleHideDrawer')).toBe(handleHideDrawer);
    expect(notifications.prop('fetchNotifications')).toBeUndefined();
  });

  it('maps the unread notifications filtered by type', () => {
    const state = {
      notifications: fromJS({
        filter: 'URGENT',
        notifications: {
          a: { guid: 'a', isRead: false, type: 'urgent', value: 'A' },
          b: { guid: 'b', isRead: false, type: 'default', value: 'B' },
        },
      }),
    };
    const guids = mapStateToProps(state).listNotifications.map((n) => n.get('guid')).toArray();
    expect(guids).toEqual(['a']);
  });
});
