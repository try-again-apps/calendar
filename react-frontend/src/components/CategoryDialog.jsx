import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class CategoryDialog extends PureComponent {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        key="button"
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    const { active } = this.props;

    return (
      <Dialog
        title="Dialog With Date Picker"
        actions={actions}
        modal={false}
        open={active}
        onRequestClose={this.handleClose}
      >
        Open a Date Picker dialog from within a dialog.
      </Dialog>
    );
  }
}

CategoryDialog.propTypes = {
  active: PropTypes.bool
};

export default CategoryDialog;
