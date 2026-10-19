import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the Notifications, Header and Footer components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('contains the Login component and not CourseList when logged out', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(1);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  it('contains CourseList and not Login when isLoggedIn is true', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(0);
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it('passes the login prop to the Login component', () => {
    const login = jest.fn();
    const wrapper = shallow(<App login={login} />);
    expect(wrapper.find('WithLogging(Login)').prop('logIn')).toBe(login);
  });

  it('passes displayDrawer and the drawer action creators to Notifications', () => {
    const displayNotificationDrawer = jest.fn();
    const hideNotificationDrawer = jest.fn();
    const wrapper = shallow(
      <App
        displayDrawer={true}
        displayNotificationDrawer={displayNotificationDrawer}
        hideNotificationDrawer={hideNotificationDrawer}
      />
    );
    const notifications = wrapper.find(Notifications);
    expect(notifications.prop('displayDrawer')).toBe(true);
    expect(notifications.prop('handleDisplayDrawer')).toBe(displayNotificationDrawer);
    expect(notifications.prop('handleHideDrawer')).toBe(hideNotificationDrawer);
  });

});

describe('mapStateToProps', () => {
  it('returns isLoggedIn and displayDrawer from the ui state', () => {
    const state = {
      ui: fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: true,
      }),
    };
    expect(mapStateToProps(state)).toEqual({ isLoggedIn: true, displayDrawer: true });
  });
});
