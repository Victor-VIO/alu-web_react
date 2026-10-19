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

  it('is a PureComponent', () => {
    expect(Object.getPrototypeOf(Notifications)).toBe(React.PureComponent);
  });

  it('displays only the menu item when displayDrawer is false', () => {
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
    expect(wrapper.find('div.Notifications p').first().text()).toBe(
      'Here is the list of notifications'
    );
  });

  it('renders No new notification for now when the list is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(0);
    expect(wrapper.find('div.Notifications p').text()).toBe('No new notification for now');
  });

  it('passes markNotificationAsRead to each NotificationItem', () => {
    const markNotificationAsRead = jest.fn();
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    wrapper.find(NotificationItem).forEach((item) => {
      expect(item.prop('markAsRead')).toBe(markNotificationAsRead);
    });

    wrapper.find(NotificationItem).at(1).dive().find('li').simulate('click');
    expect(markNotificationAsRead).toHaveBeenCalledWith(2);
  });

  it('calls handleDisplayDrawer when clicking on the menu item', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    wrapper.find('div.menuItem').simulate('click');
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when clicking on the close button', () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(
      <Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />
    );
    wrapper.find('button[aria-label="Close"]').simulate('click');
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});
