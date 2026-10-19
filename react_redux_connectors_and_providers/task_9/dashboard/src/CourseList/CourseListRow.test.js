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

  it('renders two td and a checkbox when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" textSecondCell="test2" />);
    expect(wrapper.find('td')).toHaveLength(2);
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('uses the isChecked prop for the checkbox and the row style', () => {
    const unchecked = shallow(<CourseListRow textFirstCell="ES6" textSecondCell={60} />);
    expect(unchecked.find('input').prop('checked')).toBe(false);
    expect(unchecked.find('tr').prop('style')).toBeNull();

    const checked = shallow(<CourseListRow textFirstCell="ES6" textSecondCell={60} isChecked={true} />);
    expect(checked.find('input').prop('checked')).toBe(true);
    expect(checked.find('tr').prop('style')).toEqual({ backgroundColor: '#e6e4e4' });
  });

  it('calls onChangeRow with the id and the checked value', () => {
    const onChangeRow = jest.fn();
    const wrapper = shallow(
      <CourseListRow textFirstCell="ES6" textSecondCell={60} id="1" onChangeRow={onChangeRow} />
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChangeRow).toHaveBeenCalledWith('1', true);
  });
});
