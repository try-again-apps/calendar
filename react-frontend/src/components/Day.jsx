import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CATEGORY_TYPE } from './consts';

const Day = ({ category, day, today, weekend, onClick }) => {
  const className = classNames('day number', {
    anniversary: category === CATEGORY_TYPE.Anniversary,
    birthday: category === CATEGORY_TYPE.Birthday,
    busy: category === CATEGORY_TYPE.Busy,
    holiday: category === CATEGORY_TYPE.Holiday,
    today,
    weekend
  });

  return (
    <div onClick={onClick} className={className}>
      <div>{day}</div>
    </div>
  );
};

Day.propTypes = {
  category: PropTypes.string,
  day: PropTypes.number,
  today: PropTypes.bool,
  weekend: PropTypes.bool,

  onClick: PropTypes.func
};

export default Day;
