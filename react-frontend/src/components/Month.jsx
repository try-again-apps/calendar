import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { DateTime, Info, Interval } from 'luxon';
import _range from 'lodash/range';
import _map from 'lodash/map';
import _first from 'lodash/first';
import _reduce from 'lodash/reduce';
import { connect } from 'react-redux';

import { monthInterval } from './utils';
import Day from './Day';
import { getCategories, openCategoryDialog } from './model';

class Month extends PureComponent {
  onDayClicked = (year, month, day) => () => {
    const { openCategoryDialog } = this.props;
    const dateTime = DateTime.fromObject({ year, month, day });
    openCategoryDialog(dateTime.toISODate());
  };

  renderWeek = ({ month, year, weekNumber }) => {
    const { year: calendarYear } = this.props;
    const startWeekDate = DateTime.fromObject({ weekYear: year, weekNumber });
    const endWeekDate = startWeekDate.plus({ days: 6 });
    const weekInterval = Interval.fromDateTimes(startWeekDate, endWeekDate);
    const weekMonthDays = monthInterval({
      month,
      year: calendarYear
    }).intersection(weekInterval);

    if (weekMonthDays) {
      const daysInWeek = _range(
        weekMonthDays.start.day,
        weekMonthDays.end.day + 1
      );

      // Fill with empty days to align first week
      if (daysInWeek.length < 7) {
        if (_first(daysInWeek) === 1) {
          while (daysInWeek.length < 7) {
            daysInWeek.unshift(null);
          }
        }
      }

      return (
        <div key={weekNumber} className="week">
          {_map(daysInWeek, (day, idx) => {
            const dateTime = DateTime.fromObject({ year, month, day });
            const weekDay = dateTime.weekday;
            const isHoliday = weekDay === 6 || weekDay === 7;
            return (
              <Day
                key={idx}
                day={day}
                isHoliday={isHoliday}
                onClick={this.onDayClicked(year, month, day)}
              />
            );
          })}
        </div>
      );
    }

    return null;
  };

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

    return _map(weeksInMonth, ({ weekNumber, year }) =>
      this.renderWeek({ month, year, weekNumber })
    );
  };

  render() {
    const { month, year, categories } = this.props;
    console.info(categories.toJS());
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
  categories: ImmutablePropTypes.map.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,

  openCategoryDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: getCategories(state)
});

export default connect(
  mapStateToProps,
  { openCategoryDialog }
)(Month);
