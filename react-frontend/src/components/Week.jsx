import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import _map from 'lodash/map';
import _first from 'lodash/first';
import _range from 'lodash/range';
import { DateTime, Interval } from 'luxon';
import { connect } from 'react-redux';

import { monthInterval } from './utils';
import Day from './Day';
import { getCategories, openCategoryDialog } from './model';

class Week extends PureComponent {
  onDayClicked = (year, month, day) => () => {
    const { openCategoryDialog } = this.props;
    const dateTime = DateTime.fromObject({ year, month, day });
    openCategoryDialog(dateTime.toISODate());
  };

  generateDays = () => {
    const { calendarYear, month, weekNumber, year } = this.props;
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

      return daysInWeek;
    }

    return [];
  };

  isToday = day => {
    const { month, year } = this.props;
    const now = DateTime.local();
    return day === now.day && month === now.month && year === now.year;
  };

  render() {
    const { categories, month, weekNumber, year } = this.props;
    const daysInWeek = this.generateDays();

    return (
      <div key={weekNumber} className="week">
        {_map(daysInWeek, (day, idx) => {
          const dateTime = DateTime.fromObject({ year, month, day });
          const weekDay = dateTime.weekday;
          const weekend = weekDay === 6 || weekDay === 7;
          const category = categories.get(dateTime.toISODate());
          const today = this.isToday(day);
          return (
            <Day
              category={category}
              day={day}
              key={idx}
              onClick={this.onDayClicked(year, month, day)}
              today={today}
              weekend={weekend}
            />
          );
        })}
      </div>
    );
  }
}

Week.propTypes = {
  calendarYear: PropTypes.number.isRequired,
  categories: ImmutablePropTypes.map.isRequired,
  month: PropTypes.number.isRequired,
  weekNumber: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,

  openCategoryDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: getCategories(state)
});

export default connect(
  mapStateToProps,
  { openCategoryDialog }
)(Week);
