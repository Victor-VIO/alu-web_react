import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 5 rows when given 3 courses', () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find(CourseListRow)).toHaveLength(5);
  });

  it('renders correctly with an empty list', () => {
    const wrapper = shallow(<CourseList listCourses={[]} />);
    const rows = wrapper.find(CourseListRow);
    expect(rows).toHaveLength(3);
    expect(rows.last().prop('textFirstCell')).toBe('No course available yet');
  });
});
