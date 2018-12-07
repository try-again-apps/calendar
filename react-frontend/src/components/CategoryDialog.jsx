import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { connect } from 'react-redux';
import _map from 'lodash/map';

import {
  addCategory,
  closeCategoryDialog,
  getActive,
  getSelectedDate,
  removeCategory
} from './model';
import { enumerable } from '../utils';

const CATEGORY_TYPE = enumerable(
  'Holiday',
  'Birthday',
  'Busy',
  'Anniversary',
  'None'
);

const customContentStyle = {
  width: 320
};

class CategoryDialog extends PureComponent {
  state = {
    category: CATEGORY_TYPE.Holiday
  };

  onChangeCategory = (_, category) => this.setState({ category });

  onOk = () => {
    const { category } = this.state;
    const { addCategory, date, removeCategory } = this.props;
    if (category === CATEGORY_TYPE.None) {
      removeCategory({ date });
    } else {
      addCategory({ category, date });
    }
  };

  get actions() {
    const { closeDialog } = this.props;
    return [
      <FlatButton key="cancel" label="Cancel" onClick={closeDialog} />,
      <FlatButton
        key="ok"
        label="Ok"
        primary
        keyboardFocused
        onClick={this.onOk}
      />
    ];
  }

  render() {
    const { active, closeDialog, date } = this.props;
    const { category } = this.state;

    const title = `Select category for day: ${date}`;

    return (
      <Dialog
        actions={this.actions}
        contentStyle={customContentStyle}
        onRequestClose={closeDialog}
        open={active}
        title={title}
      >
        <RadioButtonGroup
          name="category"
          defaultSelected={category}
          onChange={this.onChangeCategory}
          valueSelected={category}
        >
          {_map(CATEGORY_TYPE, item => (
            <RadioButton key={item} value={item} label={item} />
          ))}
        </RadioButtonGroup>
      </Dialog>
    );
  }
}

CategoryDialog.propTypes = {
  active: PropTypes.bool,
  date: PropTypes.string,

  addCategory: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  active: getActive(state),
  date: getSelectedDate(state)
});

export default connect(
  mapStateToProps,
  {
    addCategory,
    closeDialog: closeCategoryDialog,
    removeCategory
  }
)(CategoryDialog);
