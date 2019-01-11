import React from 'react';
import PropTypes from 'prop-types';
import MomentLocaleUtils from 'react-day-picker/moment';
import Navbar from './navbar';
import { computeTextWidth } from '../../helpers/html-helper';
import './date-picker-styles.scss';

const LABEL_PADDING = 14;

const renderMonthBody = (monthChange, selectedMonth, locale) => {
  const rows = [];
  const months = MomentLocaleUtils.getMonths(locale);
  const maxLength = computeTextWidth(months.reduce((prev, curr) => curr.length > prev.length ? curr : prev, ''));
  for (let i = 0; i < 4; i++) {
    rows.push([ ...months.slice(i * 3, i * 3 + 3) ]);
  }

  return rows.map((row, index) => (
    <tr key={ `month-row-${index}` }>
      { row.map((cell, monthIndex) => (
        <td key={ `months-cell-${cell}` } style={{ width: maxLength + LABEL_PADDING }}>
          <button className={ selectedMonth === index * 3 + monthIndex ? 'selected' : '' } onClick={ () => {
            monthChange(index * 3 + monthIndex);
          } }>{ cell }</button>
        </td>
      )) }
    </tr>
  ));
};

const MonthSelector = ({
  monthChange,
  toggleSelectingMonth,
  selectingMonth,
  toggleSelectingYear,
  selectedDay,
  locale,
  onNextClick,
  onPreviousClick,
}) => (
  <div className="DayPicker">
    <div className="DayPicker-wrapper" tabIndex="0">
      <Navbar
        onNextClick={ onNextClick }
        onPreviousClick={ onPreviousClick }
        month={ selectedDay || new Date() }
        isYear={ selectingMonth }
        toggleSelectingYear={ toggleSelectingYear }
      />
      <table className="pf3-datetime-months-table">
        <tbody>
          { renderMonthBody(month => {
            monthChange(month);
            toggleSelectingMonth(false);
          },  selectedDay && selectedDay.getMonth(),
          locale) }
        </tbody>
      </table>
    </div>
  </div>
);

MonthSelector.propTypes = {
  monthChange: PropTypes.func.isRequired,
  toggleSelectingMonth: PropTypes.func.isRequired,
  selectingMonth: PropTypes.bool,
  toggleSelectingYear: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
};

export default MonthSelector;
