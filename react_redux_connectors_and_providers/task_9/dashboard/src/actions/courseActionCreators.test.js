import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';
import {
  selectCourse,
  unSelectCourse,
  boundSelectCourse,
  boundUnSelectCourse,
  setCourses,
  fetchCourses,
} from './courseActionCreators';

describe('course action creators', () => {
  it('selectCourse returns the SELECT_COURSE action', () => {
    expect(selectCourse(1)).toEqual({ type: SELECT_COURSE, index: 1 });
  });

  it('unSelectCourse returns the UNSELECT_COURSE action', () => {
    expect(unSelectCourse(1)).toEqual({ type: UNSELECT_COURSE, index: 1 });
  });
});

describe('bound course action creators', () => {
  it('boundSelectCourse dispatches the SELECT_COURSE action', () => {
    const dispatch = jest.fn();
    boundSelectCourse(dispatch)(1);
    expect(dispatch).toHaveBeenCalledWith({ type: SELECT_COURSE, index: 1 });
  });

  it('boundUnSelectCourse dispatches the UNSELECT_COURSE action', () => {
    const dispatch = jest.fn();
    boundUnSelectCourse(dispatch)(1);
    expect(dispatch).toHaveBeenCalledWith({ type: UNSELECT_COURSE, index: 1 });
  });
});

describe('fetchCourses', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('setCourses returns the FETCH_COURSE_SUCCESS action', () => {
    const data = [{ id: '1', name: 'ES6', credit: 60 }];
    expect(setCourses(data)).toEqual({ type: FETCH_COURSE_SUCCESS, data });
  });

  it('fetches courses.json and dispatches setCourses with the data', () => {
    const data = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 },
    ];
    fetchMock.getOnce('/courses.json', data);
    const store = configureStore([thunk])({});

    return store.dispatch(fetchCourses()).then(() => {
      expect(fetchMock.called('/courses.json')).toBe(true);
      expect(store.getActions()).toEqual([{ type: FETCH_COURSE_SUCCESS, data }]);
    });
  });
});
