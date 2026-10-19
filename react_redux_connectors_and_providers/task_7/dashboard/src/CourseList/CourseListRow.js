import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
};

function CourseListRow({
  isHeader,
  textFirstCell,
  textSecondCell,
  isChecked,
  onChangeRow,
  id,
}) {
  if (isHeader) {
    return (
      <tr>
        {textSecondCell === null ? (
          <th colSpan="2">{textFirstCell}</th>
        ) : (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
          </>
        )}
      </tr>
    );
  }

  return (
    <tr style={isChecked ? styles.rowChecked : null}>
      <td>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(event) => onChangeRow(id, event.target.checked)}
        />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  onChangeRow: PropTypes.func,
  id: PropTypes.string,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
  isChecked: false,
  onChangeRow: () => {},
  id: '',
};

export default CourseListRow;
