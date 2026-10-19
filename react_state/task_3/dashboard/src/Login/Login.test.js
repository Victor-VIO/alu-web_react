import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a form with 2 labels, 2 inputs and a submit input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('label')).toHaveLength(2);
    expect(wrapper.find('input#email')).toHaveLength(1);
    expect(wrapper.find('input#password')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
  });

  it('has the submit button disabled by default', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('enables the submit button after changing the value of the two inputs', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input#email').simulate('change', { target: { value: 'test@test.com' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);

    wrapper.find('input#password').simulate('change', { target: { value: 'secret' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('disables the submit button again when a field is emptied', () => {
    const wrapper = shallow(<Login />);
    wrapper.find('input#email').simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('input#password').simulate('change', { target: { value: 'secret' } });
    wrapper.find('input#email').simulate('change', { target: { value: '' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('calls logIn with the email and password on submit without reloading the page', () => {
    const logIn = jest.fn();
    const wrapper = shallow(<Login logIn={logIn} />);
    wrapper.find('input#email').simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('input#password').simulate('change', { target: { value: 'secret' } });

    const preventDefault = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(logIn).toHaveBeenCalledWith('test@test.com', 'secret');
  });
});
