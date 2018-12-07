import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DateTime, Settings } from 'luxon';
import _range from 'lodash/range';
import _map from 'lodash/map';

import Month from './Month';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    Settings.defaultLocale = 'en';
  }

  yearValidated = year => {
    const dateTime = DateTime.fromObject({ year: +year });

    if (dateTime) {
      return dateTime.year;
    }

    return 2018;
  };

  render() {
    const {
      params: { year = 2018 }
    } = this.props;

    return (
      <div className="calendar">
        <div className="months">
          {_map(_range(1, 13), month => (
            <Month key={month} month={month} year={this.yearValidated(year)} />
          ))}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  params: PropTypes.object
};

export default Calendar;
