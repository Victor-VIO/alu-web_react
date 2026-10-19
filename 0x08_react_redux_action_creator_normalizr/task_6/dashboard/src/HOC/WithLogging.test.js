import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging', () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('logs Component on mount and unmount when wrapping pure html', () => {
    const Wrapped = WithLogging(() => <p />);
    const wrapper = mount(<Wrapped />);
    expect(logSpy).toHaveBeenCalledWith('Component Component is mounted');

    wrapper.unmount();
    expect(logSpy).toHaveBeenCalledWith('Component Component is going to unmount');
  });

  it('logs the component name on mount and unmount when wrapping Login', () => {
    const Wrapped = WithLogging(Login);
    const wrapper = mount(<Wrapped />);
    expect(logSpy).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();
    expect(logSpy).toHaveBeenCalledWith('Component Login is going to unmount');
  });

  it('sets the displayName to WithLogging(name)', () => {
    expect(WithLogging(Login).displayName).toBe('WithLogging(Login)');
  });
});
