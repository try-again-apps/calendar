import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DateTime, Info } from 'luxon';
import _range from 'lodash/range';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';

import Week from './Week';

class Month extends PureComponent {
  renderDayNames = () => {
    const weekdays = Info.weekdays('short');
    return (
      <div className="day-names">
        {_map(weekdays, dayName => (
          <div className="day" key={dayName}>
            {dayName.slice(0, -1)}
          </div>
        ))}
      </div>
    );
  };

  generateWeeks = (range, year) =>
    _reduce(
      range,
      (memo, weekNumber) => {
        memo.push({ weekNumber, year });
        return memo;
      },
      []
    );

  renderMonth = ({ month, year, weeksInWeekYear }) => {
    const startDate = DateTime.fromObject({ month, year });
    const endDate = DateTime.fromObject({
      day: startDate.daysInMonth,
      month,
      year
    });

    let weeksInMonth = [];

    const { weekNumber: startWeek } = startDate;
    const { weekNumber: endWeek } = endDate;

    if (month === 1 && startWeek !== 1) {
      weeksInMonth.push({ weekNumber: startWeek, year: year - 1 });
      weeksInMonth = weeksInMonth.concat(
        this.generateWeeks(_range(1, endWeek + 1), year)
      );
    } else if (month === 12 && endWeek === 1) {
      weeksInMonth = this.generateWeeks(
        _range(startWeek, weeksInWeekYear + 1),
        year
      );
      weeksInMonth.push({ weekNumber: endWeek, year: year + 1 });
    } else {
      weeksInMonth = this.generateWeeks(_range(startWeek, endWeek + 1), year);
    }

    const { year: calendarYear } = this.props;
    return _map(weeksInMonth, ({ weekNumber, year }) => (
      <Week
        calendarYear={calendarYear}
        key={weekNumber}
        month={month}
        year={year}
        weekNumber={weekNumber}
      />
    ));
  };

  render() {
    const { month, year } = this.props;
    const dateTime = DateTime.fromObject({ month, year });

    return (
      <div className="month">
        <div className="label">{dateTime.monthLong}</div>
        <div>
          {this.renderDayNames()}
          {this.renderMonth({
            month,
            year,
            weeksInWeekYear: DateTime.fromObject({ year }).weeksInWeekYear
          })}
        </div>
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
};

export default Month;
