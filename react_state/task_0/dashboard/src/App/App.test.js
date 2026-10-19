import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
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

  it('renders the News from the School section', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('BodySection[title="News from the School"]')).toHaveLength(1);
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

    it('calls logOut and alerts Logging you out', () => {
      const logOut = jest.fn();
      const wrapper = mount(<App logOut={logOut} />);

      document.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' }));

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
      expect(logOut).toHaveBeenCalled();
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

    it('passes displayDrawer to Notifications', () => {
      const wrapper = shallow(<App />);
      wrapper.instance().handleDisplayDrawer();
      expect(wrapper.find(Notifications).prop('displayDrawer')).toBe(true);
    });
  });
});
