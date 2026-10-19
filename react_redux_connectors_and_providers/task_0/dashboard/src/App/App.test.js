import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { App, mapStateToProps } from './App';
import { user as defaultUser } from './AppContext';
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

  it('displayDrawer is false by default and toggles with the handlers', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toBe(false);
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state().displayDrawer).toBe(true);
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('logIn and logOut update the user in the state', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().logIn('test@test.com', 'secret');
    expect(wrapper.state().value.user).toEqual({
      email: 'test@test.com',
      password: 'secret',
      isLoggedIn: true,
    });
    wrapper.instance().logOut();
    expect(wrapper.state().value.user).toEqual(defaultUser);
  });

  it('markNotificationAsRead removes the notification from the state', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().markNotificationAsRead(2);
    expect(wrapper.state().listNotifications.map((n) => n.id)).toEqual([1, 3]);
  });
});

describe('mapStateToProps', () => {
  it('returns isLoggedIn from the ui state', () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });
    expect(mapStateToProps(state)).toEqual({ isLoggedIn: true });
  });
});
