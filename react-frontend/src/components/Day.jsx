import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CATEGORY_TYPE } from './consts';

class Day extends PureComponent {
  categoryClassName = category => ({
    anniversary: category === CATEGORY_TYPE.Anniversary,
    birthday: category === CATEGORY_TYPE.Birthday,
    busy: category === CATEGORY_TYPE.Busy,
    holiday: category === CATEGORY_TYPE.Holiday
  });

  render() {
    const { category, day, weekend, onClick } = this.props;
    const className = classNames(
      'day number',
      { weekend },
      this.categoryClassName(category)
    );

    return (
      <div onClick={onClick} className={className}>
        <div>{day}</div>
      </div>
    );
  }
}

Day.propTypes = {
  category: PropTypes.string,
  day: PropTypes.number,
  weekend: PropTypes.bool,

  onClick: PropTypes.func
};

export default Day;
