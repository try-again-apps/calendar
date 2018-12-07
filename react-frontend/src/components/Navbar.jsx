import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import _range from 'lodash/range';
import _map from 'lodash/map';

import { yearValidated } from './utils';

const styles = {
  customWidth: {
    width: 100
  }
};

class Navbar extends PureComponent {
  generateYearItems = () => {
    return _map(_range(1970, 2025), year => (
      <MenuItem key={year} value={year} primaryText={year} />
    ));
  };

  onPrevious = currentYear => () => {
    const { router } = this.props;
    router.push(`/${+currentYear - 1}`);
  };

  onNext = currentYear => () => {
    const { router } = this.props;
    router.push(`/${+currentYear + 1}`);
  };

  onYearChange = (event, index, year) => {
    const { router } = this.props;
    router.push(`/${year}`);
  };

  render() {
    const {
      params: { year }
    } = this.props;

    const validYear = yearValidated(year);

    return (
      <div className="navbar">
        <IconButton onClick={this.onPrevious(validYear)}>
          <ArrowBackIcon />
        </IconButton>
        <div className="title">Calendar</div>
        <SelectField
          value={validYear}
          style={styles.customWidth}
          onChange={this.onYearChange}
        >
          {this.generateYearItems()}
        </SelectField>
        <IconButton onClick={this.onNext(validYear)}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
    );
  }
}

Navbar.propTypes = {
  params: PropTypes.object,
  router: PropTypes.object
};

export default withRouter(Navbar);
