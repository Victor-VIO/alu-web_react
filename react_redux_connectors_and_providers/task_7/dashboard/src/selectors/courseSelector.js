export const getCourses = (state) => state.courses;

export const getListCourses = (state) => getCourses(state).valueSeq();
