import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { getLatestNotification } from '../utils/utils';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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
    expect(wrapper.find('div[className^="menuItem"]')).toHaveLength(1);
    expect(wrapper.find('div[className^="notifications"]')).toHaveLength(0);
  });

  it('displays the menu item and the drawer when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find('div[className^="menuItem"]')).toHaveLength(1);
    expect(wrapper.find('div[className^="notifications"]')).toHaveLength(1);
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
    expect(wrapper.find('div[className^="notifications"] p').text()).toBe('No new notification for now');
  });
});

describe('Notifications markAsRead', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('logs the right message when markAsRead is called', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    wrapper.instance().markAsRead(1);
    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });
});

describe('Notifications updates', () => {
  it('does not rerender when updated with the same list', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({ listNotifications });
    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  it('rerenders when updated with a longer list', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={listNotifications} />
    );
    const renderSpy = jest.spyOn(wrapper.instance(), 'render');

    wrapper.setProps({
      listNotifications: [
        ...listNotifications,
        { id: 4, type: 'default', value: 'New project available' },
      ],
    });
    expect(renderSpy).toHaveBeenCalled();
    renderSpy.mockRestore();
  });
});
