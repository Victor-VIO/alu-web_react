import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it('contains the Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('contains the Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('WithLogging(Login)')).toHaveLength(1);
  });

  it('contains the Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it('does not display CourseList when isLoggedIn is false', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).toHaveLength(0);
  });

  describe('when isLoggedIn is true', () => {
    it('does not include Login and includes CourseList', () => {
      const wrapper = shallow(<App isLoggedIn={true} />);
      expect(wrapper.find('WithLogging(Login)')).toHaveLength(0);
      expect(wrapper.find(CourseList)).toHaveLength(1);
    });
  });

  describe('when the keys control and h are pressed', () => {
    let alertSpy;

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      alertSpy.mockRestore();
    });

    it('calls logOut and alerts Logging you out', () => {
      const logOut = jest.fn();
      const wrapper = mount(<App logOut={logOut} />);

      document.dispatchEvent(
        new KeyboardEvent('keydown', { ctrlKey: true, key: 'h' })
      );

      expect(alertSpy).toHaveBeenCalledWith('Logging you out');
      expect(logOut).toHaveBeenCalled();
      wrapper.unmount();
    });
  });
});

describe('App body sections', () => {
  it('renders the News from the School section', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('BodySection[title="News from the School"]')).toHaveLength(1);
  });

  it('wraps Login in a section titled Log in to continue', () => {
    const wrapper = shallow(<App />);
    expect(
      wrapper.find('BodySectionWithMarginBottom[title="Log in to continue"]')
    ).toHaveLength(1);
  });

  it('wraps CourseList in a section titled Course list when logged in', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(
      wrapper.find('BodySectionWithMarginBottom[title="Course list"]')
    ).toHaveLength(1);
  });
});
