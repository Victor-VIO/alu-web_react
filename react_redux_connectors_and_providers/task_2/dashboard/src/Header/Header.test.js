import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Header, mapStateToProps } from './Header';

const user = { email: 'test@test.com', password: 'secret' };

describe('Header', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an img and a h1 tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('School dashboard');
  });

  it('does not create the logoutSection without a user', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('#logoutSection')).toHaveLength(0);
  });

  it('creates the logoutSection when a user is passed', () => {
    const wrapper = shallow(<Header user={user} />);
    expect(wrapper.find('#logoutSection')).toHaveLength(1);
    expect(wrapper.find('#logoutSection strong').text()).toBe('test@test.com');
  });

  it('calls logout when clicking on the link', () => {
    const logout = jest.fn();
    const wrapper = shallow(<Header user={user} logout={logout} />);
    wrapper.find('#logoutSection a').simulate('click', { preventDefault: () => {} });
    expect(logout).toHaveBeenCalled();
  });
});

describe('Header mapStateToProps', () => {
  it('maps the user from the state', () => {
    const state = fromJS({ isUserLoggedIn: true }).set('user', user);
    expect(mapStateToProps(state)).toEqual({ user });
  });
});
