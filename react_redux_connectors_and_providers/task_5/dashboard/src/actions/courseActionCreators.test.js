import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import {
  selectCourse,
  unSelectCourse,
  boundSelectCourse,
  boundUnSelectCourse,
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
