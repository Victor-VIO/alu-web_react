import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const rowStyle = isHeader ? styles.headerRow : styles.row;
  const CellTag = isHeader ? 'th' : 'td';
  const cellStyle = isHeader ? styles.th : styles.td;

  return (
    <tr className={css(rowStyle)}>
      {isHeader && textSecondCell === null ? (
        <th colSpan="2" className={css(styles.th, styles.thFullWidth)}>
          {textFirstCell}
        </th>
      ) : (
        <>
          <CellTag className={css(cellStyle)}>{textFirstCell}</CellTag>
          <CellTag className={css(cellStyle)}>{textSecondCell}</CellTag>
        </>
      )}
    </tr>
  );
}

const cellBase = {
  border: '1px solid #ccc',
  padding: '4px 8px',
  textAlign: 'left',
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#f5f5f5ab',
  },

  headerRow: {
    backgroundColor: '#deb5b545',
  },

  th: {
    ...cellBase,
  },

  thFullWidth: {
    textAlign: 'center',
  },

  td: {
    ...cellBase,
  },
});

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
