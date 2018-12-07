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

  onPrevious = () => {
    const {
      router,
      params: { year }
    } = this.props;
    router.push(`/${+year - 1}`);
  };

  onNext = () => {
    const {
      router,
      params: { year }
    } = this.props;
    router.push(`/${+year + 1}`);
  };

  onYearChange = (event, index, year) => {
    const { router } = this.props;
    router.push(`/${year}`);
  };

  render() {
    const {
      params: { year }
    } = this.props;

    return (
      <div className="navbar">
        <IconButton onClick={this.onPrevious}>
          <ArrowBackIcon />
        </IconButton>
        <div className="title">Calendar </div>
        <SelectField
          value={+year}
          style={styles.customWidth}
          onChange={this.onYearChange}
        >
          {this.generateYearItems()}
        </SelectField>
        <IconButton onClick={this.onNext}>
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