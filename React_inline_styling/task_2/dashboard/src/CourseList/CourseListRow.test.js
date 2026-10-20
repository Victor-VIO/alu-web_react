import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import CourseListRow from './CourseListRow';

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
    expect(th.text()).toBe('test');
  });

  it('renders two th when isHeader is true and there is a second cell', () => {
    const wrapper = shallow(
      <CourseListRow isHeader={true} textFirstCell="test" textSecondCell="test2" />
    );
    expect(wrapper.find('th')).toHaveLength(2);
    expect(wrapper.find('td')).toHaveLength(0);
  });

  it('renders two td within a tr when isHeader is false', () => {
    const wrapper = shallow(
      <CourseListRow textFirstCell="test" textSecondCell="test2" />
    );
    expect(wrapper.find('tr')).toHaveLength(1);
    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('th')).toHaveLength(0);
  });

  it('applies the header row style when isHeader is true', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(wrapper.find('tr').prop('className')).toMatch(/^headerRow_/);
  });

  it('applies the default row style when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" textSecondCell="test2" />);
    expect(wrapper.find('tr').prop('className')).toMatch(/^row_/);
  });

  it('applies the full width th style to a single header cell', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" />);
    expect(wrapper.find('th').prop('className')).toMatch(/^th_.*-o_O-thFullWidth_/);
  });

  it('applies the th style to header cells and td style to body cells', () => {
    const header = shallow(
      <CourseListRow isHeader={true} textFirstCell="a" textSecondCell="b" />
    );
    header.find('th').forEach((th) => expect(th.prop('className')).toMatch(/^th_/));

    const body = shallow(<CourseListRow textFirstCell="a" textSecondCell="b" />);
    body.find('td').forEach((td) => expect(td.prop('className')).toMatch(/^td_/));
  });
});
