import React from 'react';
import { FormControl, Icon, Form } from 'patternfly-react';
import { LocaleUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './date-picker-styles.scss';

class PickerInput extends React.Component {
  render() {
    const { variant, ...props } = this.props;
    return (
      <Form.InputGroup style={{ cursor: 'pointer' }}>
        <FormControl onChange={ () => ({}) } readOnly={ true } { ...props } type="text" style={{ cursor: 'pointer', backgroundColor: 'white' }} />
        <Form.InputGroup.Addon onClick={ props.onClick }>
          <Icon name={ variant === 'time' ? 'time' : 'calendar' } />
        </Form.InputGroup.Addon>
      </Form.InputGroup >
    );
  }
}

const Navbar = ({ onNextClick, onPreviousClick, month, onMonthClick, isYear, selectedDay, toggleSelectingYear }) => (
  <table className="year-interval-header">
    <tr>
      <td onClick={ () => onPreviousClick() }>
        <Icon name="angle-left"><span>Prev interval</span></Icon>
      </td>
      <td>
        { isYear
          ? <button className="navbar-center-button" type="button" onClick={ () => toggleSelectingYear(true) }>{ month.getFullYear() }</button>
          : <button className="navbar-center-button" type="button" onClick={ () => onMonthClick(true) }>{ LocaleUtils.formatMonthTitle(month) }</button> }
      </td>
      <td onClick={ () => onNextClick() }>
        <Icon name="angle-right" ><span>Next interval</span></Icon>
      </td>
    </tr>
  </table>
);

const renderMonthBody = (monthChange, selectedMonth) => {
  const rows = [];
  const months = LocaleUtils.getMonths();
  for (let i = 0; i < 4; i++) {
    rows.push([ ...months.slice(i * 3, i * 3 + 3) ]);
  }

  return rows.map((row, index) => (
    <tr key={ `month-row-${index}` }>
      { row.map((cell, monthIndex) => (
        <td key={ `months-cell-${cell}` }>
          <button className={ selectedMonth === index * 3 + monthIndex ? 'selected' : '' } onClick={ () => {
            monthChange(index * 3 + monthIndex);
          } }>{ cell }</button>
        </td>
      )) }
    </tr>
  ));
};

const MonthSelector = ({ monthChange, toggleSelectingMonth, selectingMonth, month, toggleSelectingYear, selectedDay }) => (
  <div className="DayPicker">
    <div className="DayPicker-wrapper" tabIndex="0">
      <Navbar month={ month || new Date() } isYear={ selectingMonth } toggleSelectingYear={ toggleSelectingYear }/>
      <table className="pf3-datetime-months-table">
        <tbody>
          { renderMonthBody(month => {
            monthChange(month);
            toggleSelectingMonth(false);
          },  selectedDay && selectedDay.getMonth()) }
        </tbody>
      </table>
    </div>
  </div>
);

const YearIntervalSelector = ({ currentInterval, prevInterval, nextInterval }) => (
  <table className="year-interval-header">
    <tbody>
      <tr>
        <td  onClick={ prevInterval }>
          <Icon name="angle-left"><span>Prev interval</span></Icon>
        </td>
        <td>
          <button className="year-interval-button" disabled>{ `${currentInterval[0]} - ${currentInterval[1]}` }</button>
        </td>
        <td onClick={ nextInterval }>
          <Icon name="angle-right" ><span>Next interval</span></Icon>
        </td>
      </tr>
    </tbody>
  </table>
);

const renderYearsBody = (startingYear, yearClick, currentYear) => {
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push([ 0, 1, 2, 3, 4 ]);
  }

  return rows.map((row, index) => (
    <tr key={ `year-row-${index}` }>
      { row.map(year => (
        <td key={ `year-cell-${year}` }>
          <button
            className={ startingYear + index * 5 + year === currentYear ? 'selected' : '' }
            onClick={ () => yearClick(startingYear + index * 5 + year) }
          >
            { startingYear + index * 5 + year }
          </button>
        </td>
      )) }
    </tr>
  ));
};

class YearSelector  extends React.Component {
  constructor(props) {
    super(props);
    let initialYear = new Date().getFullYear();
    this.state = {
      initialYear,
      firstInterval: [ initialYear - 19, initialYear ],
      currentInterval: [ initialYear - 19, initialYear ],
    };
  }
  handleNextInterval = () => this.setState(({ currentInterval }) => ({ currentInterval: [ currentInterval[1] + 1, currentInterval[1] + 20 ]}))

  handlePrevInterval = () => this.setState(({ currentInterval }) => ({ currentInterval: [ currentInterval[0] - 20, currentInterval[0] - 1 ]}))
  render() {
    const { toggleSelectingYear, yearChange, selectedDay } = this.props;
    const { currentInterval } = this.state;
    const years = [];
    for (let year = currentInterval[0]; year < currentInterval[1]; year++) {
      years.push(year);
    }

    return (
      <div className="DayPicker">
        <div className="DayPicker-wrapper" tabIndex="0">
          <div>
            <YearIntervalSelector
              prevInterval={ this.handlePrevInterval }
              nextInterval={ this.handleNextInterval }
              currentInterval={ currentInterval }
            />
            <table className="pf3-datetime-months-table">
              <tbody>
                { renderYearsBody(currentInterval[0], year => {
                  yearChange(year);
                  toggleSelectingYear(false);
                }, selectedDay && selectedDay.getFullYear()) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const OverlayComponent = ({
  children,
  classNames,
  selectedDay,
  monthChange,
  selectingMonth,
  toggleSelectingMonth,
  selectingYear,
  toggleSelectingYear,
  yearChange,
  ...props
}) => {
  return (
    <div className="pf3-calendar" { ...props }>
      { selectingYear ?
        <YearSelector selectedDay={ selectedDay } toggleSelectingYear={ toggleSelectingYear } yearChange={ yearChange } />
        : selectingMonth
          ? (
            <MonthSelector
              selectingMonth={ selectingMonth }
              selectedDay={ selectedDay }
              monthChange={ monthChange }
              toggleSelectingMonth={ toggleSelectingMonth }
              toggleSelectingYear={ toggleSelectingYear }
            />)
          : children }
    </div>
  );
};

class PickerWrapper extends React.Component {
  state = {
    selectedDay: undefined,
    selectingMonth: false,
    selectingYear: false,
  }

  toggleSelectingMonth = selectingMonth => this.setState({ selectingMonth })

  toggleSelectingYear = selectingYear => this.setState({ selectingYear })

  handleDayClick = (day, { selectedDay }) => {
    this.setState({
      selectedDay: selectedDay ? undefined : day,
    });
  };

  handleMonthClick = month => this.setState(({ selectedDay }) => ({
    selectedDay: selectedDay ? new Date(selectedDay.getFullYear(), month, selectedDay.getDay() || 1) : new Date(new Date().getFullYear(), month),
  }));

  handleYearClick = year => this.setState(({ selectedDay }) => ({
    selectedDay: selectedDay ? new Date(year, selectedDay.getMonth(), selectedDay.getDay() || 1) : new Date(year, new Date().getMonth()),
  }))

  render(){
    const { selectedDay, selectingMonth, selectingYear } = this.state;
    return (
      <DayPickerInput
        value={ selectedDay }
        component={ PickerInput }
        className="pf3-calendar"
        hideOnDayClick={ true }
        onDayChange={ this.handleDayClick }
        overlayComponent={ props => (
          <OverlayComponent
            { ...props }
            selectingMonth={ selectingMonth }
            toggleSelectingMonth={ this.toggleSelectingMonth }
            monthChange={ this.handleMonthClick }
            yearChange={ this.handleYearClick }
            selectingYear={ selectingYear }
            selectedDay={ selectedDay }
            toggleSelectingYear={ this.toggleSelectingYear }
          />
        ) }
        dayPickerProps={{
          selectedDays: selectedDay,
          month: selectedDay,
          showOutsideDays: true,
          todayButton: 'Today',
          navbarElement: props => (
            <Navbar
              { ...props }
              onMonthClick={ this.toggleSelectingMonth }
              monthChange={ this.handleMonthClick }
            />
          ),
        }}
      />
    );
  }
}

export default PickerWrapper;
