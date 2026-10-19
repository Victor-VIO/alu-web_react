import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

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
});

describe('CourseListRow checkbox', () => {
  it('renders an unchecked checkbox in the first cell of a simple row', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell={60} />);
    const checkbox = wrapper.find('td').first().find('input[type="checkbox"]');
    expect(checkbox).toHaveLength(1);
    expect(checkbox.prop('checked')).toBe(false);
    expect(wrapper.find('tr').prop('style')).toBeNull();
  });

  it('applies rowChecked when checked and removes it when unchecked', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell={60} />);

    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
    expect(wrapper.find('tr').prop('style')).toEqual({ backgroundColor: '#e6e4e4' });

    wrapper.find('input[type="checkbox"]').simulate('change');
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(false);
    expect(wrapper.find('tr').prop('style')).toBeNull();
  });

  it('does not render a checkbox in header rows', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Available courses" />);
    expect(wrapper.find('input')).toHaveLength(0);
  });
});
