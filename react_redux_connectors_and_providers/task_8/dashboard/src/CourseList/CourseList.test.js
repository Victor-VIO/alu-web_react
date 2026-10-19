import React from 'react';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';
import { CourseList, mapStateToProps } from './CourseList';
import CourseListRow from './CourseListRow';

const listCourses = fromJS([
  { id: '1', name: 'ES6', credit: 60, isSelected: false },
  { id: '2', name: 'Webpack', credit: 20, isSelected: true },
  { id: '3', name: 'React', credit: 40, isSelected: false },
]);

describe('CourseList', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 5 rows when given 3 courses and passes isChecked', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const rows = wrapper.find(CourseListRow);
    expect(rows).toHaveLength(5);
    expect(rows.at(3).prop('isChecked')).toBe(true);
  });

  it('renders No course available yet with an empty list', () => {
    const wrapper = shallow(<CourseList listCourses={List()} />);
    expect(wrapper.find('tbody').text()).toBe('No course available yet');
  });

  it('dispatches fetchCourses when the component is mounted', () => {
    const fetchCourses = jest.fn();
    shallow(<CourseList fetchCourses={fetchCourses} />);
    expect(fetchCourses).toHaveBeenCalledTimes(1);
  });

  it('dispatches selectCourse and unSelectCourse from onChangeRow', () => {
    const selectCourse = jest.fn();
    const unSelectCourse = jest.fn();
    const wrapper = shallow(
      <CourseList selectCourse={selectCourse} unSelectCourse={unSelectCourse} />
    );

    wrapper.instance().onChangeRow('1', true);
    expect(selectCourse).toHaveBeenCalledWith('1');

    wrapper.instance().onChangeRow('1', false);
    expect(unSelectCourse).toHaveBeenCalledWith('1');
  });
});

describe('CourseList mapStateToProps', () => {
  it('maps listCourses with the getListCourses selector', () => {
    const state = { courses: fromJS({ 1: { id: '1', name: 'ES6', credit: 60, isSelected: false } }) };
    expect(mapStateToProps(state).listCourses.toJS()).toEqual([
      { id: '1', name: 'ES6', credit: 60, isSelected: false },
    ]);
  });
});
