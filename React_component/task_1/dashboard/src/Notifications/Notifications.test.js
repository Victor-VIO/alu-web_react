import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';

const listNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

describe('Notifications', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it('displays the menu item when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.find('div.menuItem')).toHaveLength(1);
    expect(wrapper.find('div.Notifications')).toHaveLength(0);
  });

  it('displays the menu item and the drawer when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div.menuItem')).toHaveLength(1);
    expect(wrapper.find('div.Notifications')).toHaveLength(1);
  });

  it('renders the list of notifications', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
    expect(wrapper.find('p').at(1).text()).toBe('Here is the list of notifications');
  });

  it('renders No new notification for now when the list is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(0);
    expect(wrapper.find('div.Notifications p').text()).toBe('No new notification for now');
  });
});
