import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { user as defaultUser } from './AppContext';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';

const loggedInUser = {
  email: 'test@test.com',
  password: 'secret',
  isLoggedIn: true,
};

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

  it('contains CourseList and not Login when the user in the state is logged in', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ value: { ...wrapper.state().value, user: loggedInUser } });
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(0);
    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it('passes logIn to the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('WithLogging(Login)').prop('logIn')).toBe(wrapper.instance().logIn);
  });

  describe('when the keys control and h are pressed', () => {
    let alertSpy;
    let logSpy;

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      alertSpy.mockRestore();
      logSpy.mockRestore();
    });

    it('alerts Logging you out and resets the user in the state', () => {
      const wrapper = mount(<App />);
      wrapper.instance().logIn('test@test.com', 'secret');
      expect(wrapper.state().value.user.isLoggedIn).toBe(true);

      document.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' }));

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
      expect(wrapper.state().value.user).toEqual(defaultUser);
      wrapper.unmount();
    });
  });

  describe('displayDrawer state', () => {
    it('is false by default and true after handleDisplayDrawer', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().displayDrawer).toBe(false);
      wrapper.instance().handleDisplayDrawer();
      expect(wrapper.state().displayDrawer).toBe(true);
    });

    it('is false after handleHideDrawer', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().handleDisplayDrawer();
      wrapper.instance().handleHideDrawer();
      expect(wrapper.state().displayDrawer).toBe(false);
    });
  });

  describe('logIn and logOut', () => {
    it('logIn updates the user in the state', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().logIn('test@test.com', 'secret');
      expect(wrapper.state().value.user).toEqual(loggedInUser);
    });

    it('logOut resets the user in the state', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().logIn('test@test.com', 'secret');
      wrapper.instance().logOut();
      expect(wrapper.state().value.user).toEqual(defaultUser);
    });

    it('keeps the logOut function in the context value', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().value.logOut).toBe(wrapper.instance().logOut);
    });
  });
});
