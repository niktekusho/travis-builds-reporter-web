import React, {Component} from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal100} from 'material-ui/styles/colors';
import {connect} from 'react-redux';

import logo from './logo.svg';
import './App.css';

import BuildsPage from './components/BuildsPage';
import {fetch} from './store/actions';

// Material-UI Theme
const muiTheme = getMuiTheme();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryAuthor: '',
      repository: '',
    };
  }

  repositoryChanged(event) {
    this.setState({
      repository: event.target.value,
    });
  }

  repositoryAuthorChanged(event) {
    this.setState({
      repositoryAuthor: event.target.value,
    });
  }

  getRepository() {
    return `${this.state.repositoryAuthor}/${this.state.repository}`;
  }

  submit() {
    const repo = this.getRepository();
    const {dispatch} = this.props;
    dispatch(fetch(repo));
  }

  clear() {
    this.setState({
      repositoryAuthor: '',
      repository: '',
    });
  }

  render() {
    const {builds, isFetching} = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <h1>
            This tool returns basic builds statistics for a Travis enabled <span
            className="importantText">PUBLIC-ONLY</span> repository.
          </h1>
          <div>
            <div>
              <TextField
                floatingLabelText="Repository user's name"
                onChange={event => this.repositoryAuthorChanged(event)}
              />
              /
              <TextField
                floatingLabelText="Repository name"
                onChange={event => this.repositoryChanged(event)}
              />
            </div>
          </div>
          <RaisedButton primary={true} onClick={() => this.submit()} label="Fetch"/>
          <BuildsPage repository={this.getRepository()} isFetching={isFetching} builds={builds}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => {
  const {repository, builds, isFetching} = state;
  return {
    repository,
    builds,
    isFetching,
  };
};

export default connect(mapStateToProps)(App)
