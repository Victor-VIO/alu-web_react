import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import CourseListRow from './CourseListRow';
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../actions/courseActionCreators';
import { getListCourses } from '../selectors/courseSelector';
import './CourseList.css';

export class CourseList extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  onChangeRow = (id, checked) => {
    if (checked) {
      this.props.selectCourse(id);
    } else {
      this.props.unSelectCourse(id);
    }
  };

  render() {
    const { listCourses } = this.props;

    return (
      <table id="CourseList">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {listCourses.count() === 0 ? (
            <tr>
              <td colSpan="2">No course available yet</td>
            </tr>
          ) : (
            listCourses
              .map((course) => (
                <CourseListRow
                  key={course.get('id')}
                  id={course.get('id')}
                  textFirstCell={course.get('name')}
                  textSecondCell={course.get('credit')}
                  isChecked={course.get('isSelected')}
                  onChangeRow={this.onChangeRow}
                />
              ))
              .toArray()
          )}
        </tbody>
      </table>
    );
  }
}

CourseList.propTypes = {
  listCourses: PropTypes.object,
  fetchCourses: PropTypes.func,
  selectCourse: PropTypes.func,
  unSelectCourse: PropTypes.func,
};

CourseList.defaultProps = {
  listCourses: List(),
  fetchCourses: () => {},
  selectCourse: () => {},
  unSelectCourse: () => {},
};

export function mapStateToProps(state) {
  return {
    listCourses: getListCourses(state),
  };
}

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
