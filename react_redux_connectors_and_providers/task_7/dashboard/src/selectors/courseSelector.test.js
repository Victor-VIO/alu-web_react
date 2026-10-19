import courseReducer from '../reducers/courseReducer';
import { getListCourses } from './courseSelector';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE } from '../actions/courseActionTypes';

const data = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

describe('getListCourses', () => {
  it('returns an empty list when there is no course', () => {
    expect(getListCourses({ courses: courseReducer(undefined, {}) }).count()).toBe(0);
  });

  it('returns every course entity as an Immutable sequence', () => {
    let courses = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    courses = courseReducer(courses, { type: SELECT_COURSE, index: '3' });

    const list = getListCourses({ courses });
    expect(list.toJS()).toEqual([
      { id: '1', name: 'ES6', credit: 60, isSelected: false },
      { id: '2', name: 'Webpack', credit: 20, isSelected: false },
      { id: '3', name: 'React', credit: 40, isSelected: true },
    ]);
  });
});
