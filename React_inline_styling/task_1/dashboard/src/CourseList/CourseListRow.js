import React from 'react';
import PropTypes from 'prop-types';

const rowStyle = { backgroundColor: '#f5f5f5ab' };
const headerRowStyle = { backgroundColor: '#deb5b545' };
const cellStyle = { border: '1px solid #ccc', padding: '4px 8px', textAlign: 'left' };
const fullWidthHeaderStyle = { ...cellStyle, textAlign: 'center' };

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  if (isHeader) {
    return (
      <tr style={headerRowStyle}>
        {textSecondCell === null ? (
          <th colSpan="2" style={fullWidthHeaderStyle}>{textFirstCell}</th>
        ) : (
          <>
            <th style={cellStyle}>{textFirstCell}</th>
            <th style={cellStyle}>{textSecondCell}</th>
          </>
        )}
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td style={cellStyle}>{textFirstCell}</td>
      <td style={cellStyle}>{textSecondCell}</td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
