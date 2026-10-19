import React from 'react';
import { mount } from 'enzyme';
import Header from './Header';
import AppContext, { user as defaultUser, logOut as defaultLogOut } from '../App/AppContext';

const loggedInUser = {
  email: 'test@test.com',
  password: 'secret',
  isLoggedIn: true,
};

describe('Header', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an img and a h1 tag', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
  });

  it('does not create the logoutSection with the default context value', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('creates the logoutSection when a user is logged in', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: defaultLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    const section = wrapper.find('#logoutSection');
    expect(section).toHaveLength(1);
    expect(section.text()).toContain('Welcome test@test.com');
  });

  it('calls logOut when clicking on the logout link', () => {
    const logOutSpy = jest.fn();
    const wrapper = mount(
      <AppContext.Provider value={{ user: loggedInUser, logOut: logOutSpy }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection a').simulate('click');
    expect(logOutSpy).toHaveBeenCalled();
  });
});
