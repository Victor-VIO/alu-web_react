import { Map } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('has the courses, notifications and ui Maps as initial state', () => {
    const state = rootReducer(undefined, {});

    expect(Object.keys(state)).toEqual(['courses', 'notifications', 'ui']);
    expect(Map.isMap(state.courses)).toBe(true);
    expect(Map.isMap(state.notifications)).toBe(true);
    expect(Map.isMap(state.ui)).toBe(true);
  });
});
