import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, Map } from 'immutable';
import { Notifications, mapStateToProps } from './Notifications';
import NotificationItem from './NotificationItem';

const listNotifications = fromJS({
  'guid-1': { guid: 'guid-1', isRead: false, type: 'default', value: 'New course available' },
  'guid-2': { guid: 'guid-2', isRead: false, type: 'urgent', value: 'New resume available' },
  'guid-3': { guid: 'guid-3', isRead: false, type: 'urgent', value: 'New project available' },
});

describe('Notifications', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays only the menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('div.menuItem')).toHaveLength(1);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  it('renders the list of notifications', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
    expect(wrapper.find('div.Notifications p').first().text()).toBe(
      'Here is the list of notifications'
    );
  });

  it('renders No new notification for now when the list is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={Map({})} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(0);
    expect(wrapper.find('div.Notifications p').text()).toBe('No new notification for now');
  });

  it('calls fetchNotifications when the component is mounted', () => {
    const fetchNotifications = jest.fn();
    shallow(<Notifications fetchNotifications={fetchNotifications} />);
    expect(fetchNotifications).toHaveBeenCalledTimes(1);
  });

  it('passes markNotificationAsRead to each NotificationItem with the guid as id', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    const item = wrapper.find(NotificationItem).at(1);
    expect(item.prop('id')).toBe('guid-2');
    item.dive().find('li').simulate('click');
    expect(markNotificationAsRead).toHaveBeenCalledWith('guid-2');
  });

  it('calls handleDisplayDrawer and handleHideDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
    );
    wrapper.find('div.menuItem').simulate('click');
    wrapper.find('button[aria-label="Close"]').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});

describe('Notifications mapStateToProps', () => {
  it('maps listNotifications to the unread messages of the notifications state', () => {
    const state = {
      notifications: fromJS({
        filter: 'DEFAULT',
        notifications: listNotifications.setIn(['guid-2', 'isRead'], true),
      }),
    };
    const guids = mapStateToProps(state)
      .listNotifications.map((n) => n.get('guid'))
      .toArray();
    expect(guids).toEqual(['guid-1', 'guid-3']);
  });
});
