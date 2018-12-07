import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Settings } from 'luxon';
import _range from 'lodash/range';
import _map from 'lodash/map';

import Month from './Month';
import { yearValidated } from './utils';

class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    Settings.defaultLocale = 'en';
  }

  render() {
    const {
      params: { year }
    } = this.props;

    return (
      <div className="calendar">
        <div className="months">
          {_map(_range(1, 13), month => (
            <Month key={month} month={month} year={yearValidated(year)} />
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
