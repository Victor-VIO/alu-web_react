import courseReducer from './courseReducer';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';

const data = [
  { id: '1', name: 'ES6', credit: 60 },
  { id: '2', name: 'Webpack', credit: 20 },
  { id: '3', name: 'React', credit: 40 },
];

describe('courseReducer', () => {
  it('returns an empty Map by default', () => {
    expect(courseReducer(undefined, {}).toJS()).toEqual({});
  });

  it('stores the courses with isSelected false on FETCH_COURSE_SUCCESS', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    expect(state.toJS()).toEqual({
      1: { id: '1', name: 'ES6', credit: 60, isSelected: false },
      2: { id: '2', name: 'Webpack', credit: 20, isSelected: false },
      3: { id: '3', name: 'React', credit: 40, isSelected: false },
    });
  });

  it('selects and unselects a course', () => {
    let state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    state = courseReducer(state, { type: SELECT_COURSE, index: '2' });
    expect(state.getIn(['2', 'isSelected'])).toBe(true);

    state = courseReducer(state, { type: UNSELECT_COURSE, index: '2' });
    expect(state.getIn(['2', 'isSelected'])).toBe(false);
  });

  it('ignores unknown course ids', () => {
    const state = courseReducer(undefined, { type: FETCH_COURSE_SUCCESS, data });
    expect(courseReducer(state, { type: SELECT_COURSE, index: '42' })).toBe(state);
  });
});
