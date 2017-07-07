import React, { Component } from 'react';

import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import TextStats from './components/TextStats';
import { fetch } from './store/actions';

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

  submit() {
    const repo = `${this.state.repositoryAuthor}/${this.state.repository}`;
    const { dispatch } = this.props;
    dispatch(fetch(repo));
  }

  clear() {
    this.setState({
      repositoryAuthor: '',
      repository: '',
    });
  }

  render() {
    const { builds, isFetching } = this.props;

    let renderNext = (null);
    if (isFetching) {
      renderNext = <div>loading... </div>;
    } else {
      if (builds.length > 0) {
        renderNext = <TextStats builds={builds} />;
      }
    }

    return (
      <div className="App">
        <h1>
          This tool returns basic builds statistics for a Travis enabled <span className="importantText">PUBLIC-ONLY</span> repository.
        </h1>
        <div>
          <input
            type="text"
            name="repository-name"
            value={this.state.repositoryAuthor}
            placeholder="Repository user's name"
            onChange={event => this.repositoryAuthorChanged(event)}
          />
          /
          <input
            type="text"
            name="repository"
            value={this.state.repository}
            placeholder="Repository name"
            onChange={event => this.repositoryChanged(event)}
          />
          <button onClick={() => this.submit()}>Fetch</button>
        </div>
        {renderNext}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { repository, builds, isFetching } = state;
  return {
    repository,
    builds,
    isFetching,
  };
};

export default connect(mapStateToProps)(App)
