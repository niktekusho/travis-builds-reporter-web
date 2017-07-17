import React, {Component} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

import './App.css';

import BuildsPage from './components/BuildsPage';
import Intro from './components/Intro';
import RepositoryForm from './components/RepositoryForm';
import About from './components/AboutPage';
import { fetcher } from './store/actions';

// Material-UI Theme
const muiTheme = getMuiTheme();

class App extends Component {
  static ERRORTEXT = 'This field is required';

  constructor(props) {
    super(props);
    this.state = {
      isAboutOpen: false,
      isMenuOpen: false,
      isResultOpen: false,
      repositoryAuthor: '',
      repository: '',
      errorTextRepository: '',
      errorTextRepositoryAuthor: '',
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
    let submit = true;
    if (this.state.repositoryAuthor === '') {
      submit = false;
      this.setState({
        errorTextRepositoryAuthor: App.ERRORTEXT,
      });
    } else {
      this.setState({
        errorTextRepositoryAuthor: '',
      });
    }
    if (this.state.repository === '') {
      submit = false;
      this.setState({
        errorTextRepository: App.ERRORTEXT,
      });
    } else {
      this.setState({
        errorTextRepository: '',
      });
    }
    if (submit) {
      this.setState({
        isResultOpen: true,
      });
      const repo = this.getRepository();
      const {dispatch} = this.props;
      dispatch(fetcher(repo));
    }
  }

  backToHome() {
    this.setState({
      isResultOpen: false,
    });
  }

  clear() {
    this.setState({
      repositoryAuthor: '',
      repository: '',
    });
  }

  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  }

  openAbout() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      isAboutOpen: true,
      isResultOpen: false,
      repository: '',
      repositoryAuthor: '',
    });
  }

  closeAbout() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
      isAboutOpen: false,
    });
  }

  render() {
    const {builds, isFetching, error} = this.props;

    let content = (
      <div>
        <Intro />
        <RepositoryForm
          repositoryAuthorChanged={event => this.repositoryAuthorChanged(event)}
          repositoryChanged={event => this.repositoryChanged(event)}
          submit={() => this.submit()}
          repositoryError={this.state.errorTextRepository}
          repositoryAuthorError={this.state.errorTextRepositoryAuthor}
        />
      </div>
    );

    if (this.state.isAboutOpen) {
      content = <About />;
    }

    if (this.state.isResultOpen) {
      content = (
        <BuildsPage
          repository={this.getRepository()}
          isFetching={isFetching}
          builds={builds}
          error={error}
          handleBack={() => this.backToHome()}
        />
      )
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppBar
            title="Travis Builds Reporter"
            onLeftIconButtonTouchTap={() => this.toggleMenu()}
          />
          <Drawer
            open={this.state.isMenuOpen}
            docked={false}
            onRequestChange={isMenuOpen => this.setState({ isMenuOpen })}
          >
            <MenuItem onTouchTap={() => this.closeAbout()} disabled={!this.state.isAboutOpen}>Home</MenuItem>
            <MenuItem onTouchTap={() => this.openAbout()} disabled={this.state.isAboutOpen}>About</MenuItem>
          </Drawer>
          { content }
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => {
  const {repository, builds, isFetching, error} = state;
  return {
    repository,
    builds,
    isFetching,
    error,
  };
};

export default connect(mapStateToProps)(App)
