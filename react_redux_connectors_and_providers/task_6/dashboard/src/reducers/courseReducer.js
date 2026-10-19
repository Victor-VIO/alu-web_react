import { Map, fromJS } from 'immutable';
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import { coursesNormalizer } from '../schema/courses';

export const initialState = Map({});

export default function courseReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS: {
      const courses = action.data.map((course) => ({ ...course, isSelected: false }));
      return state.mergeDeep(fromJS(coursesNormalizer(courses).entities.courses || {}));
    }
    case SELECT_COURSE:
    case UNSELECT_COURSE: {
      const id = String(action.index);
      if (!state.has(id)) {
        return state;
      }
      return state.setIn([id, 'isSelected'], action.type === SELECT_COURSE);
    }
    default:
      return state;
  }
}
