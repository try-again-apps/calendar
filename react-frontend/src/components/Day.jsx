import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Day extends PureComponent {
  render() {
    const { day, isHoliday, onClick } = this.props;
    const className = classNames('day number', { holiday: isHoliday });
    return (
      <div onClick={onClick} className={className}>
        <div>{day}</div>
      </div>
    );
  }
}

Day.propTypes = {
  day: PropTypes.number,
  isHoliday: PropTypes.bool,

  onClick: PropTypes.func
};

export default Day;
