import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('CourseListRow', () => {
  it('renders one th with colspan 2 when isHeader is true and there is no second cell', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    const th = wrapper.find('th');
    expect(th).toHaveLength(1);
    expect(th.prop('colSpan')).toBe('2');
  });

  it('renders two th when isHeader is true and there is a second cell', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="test" textSecondCell="test2" />
    );
    expect(wrapper.find('th')).toHaveLength(2);
  });

  it('renders two td within a tr when isHeader is false', () => {
    const wrapper = shallow(
      <CourseListRow textFirstCell="test" textSecondCell="test2" />
    );
    expect(wrapper.find('tr')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(2);
  });

  it('applies the header row background color when isHeader is true', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(wrapper.find('tr').prop('style')).toEqual({ backgroundColor: '#deb5b545' });
  });

  it('applies the default row background color when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" textSecondCell="test2" />);
    expect(wrapper.find('tr').prop('style')).toEqual({ backgroundColor: '#f5f5f5ab' });
  });
});
