import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Footer, mapStateToProps } from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the text Copyright', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain('Copyright');
  });

  it('does not display the Contact us link when there is no user', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('a')).toHaveLength(0);
  });

  it('displays the Contact us link when a user is logged in', () => {
    const wrapper = shallow(<Footer user={{ email: 'test@test.com', password: 'secret' }} />);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});

describe('Footer mapStateToProps', () => {
  it('maps the user from the state', () => {
    const user = { email: 'test@test.com', password: 'secret' };
    const state = fromJS({}).set('user', user);
    expect(mapStateToProps(state)).toEqual({ user });
  });
});
