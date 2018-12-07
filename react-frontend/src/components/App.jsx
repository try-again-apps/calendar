import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import './App.css';
import Navbar from './Navbar';
import CategoryDialog from './CategoryDialog';

const paperStyle = {
  padding: 16
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(/*darkBaseTheme*/)}>
        <div className="container">
          <Paper zDepth={4} style={paperStyle}>
            <Navbar />
          </Paper>
          <Paper zDepth={4} style={paperStyle}>
            {this.props.children}
          </Paper>
          <CategoryDialog />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
