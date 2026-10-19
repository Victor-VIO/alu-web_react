import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import AppContext, { user as defaultUser, logOut } from '../App/AppContext';

describe('Footer', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the text Copyright', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not display the Contact us link when the user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a')).toHaveLength(0);
  });

  it('displays the Contact us link when the user is logged in', () => {
    const wrapper = mount(
      <AppContext.Provider
        value={{ user: { email: 'test@test.com', password: 'secret', isLoggedIn: true }, logOut }}
      >
        <Footer />
      </AppContext.Provider>
    );
    const link = wrapper.find('a');
    expect(link).toHaveLength(1);
    expect(link.text()).toBe('Contact us');
  });
});
