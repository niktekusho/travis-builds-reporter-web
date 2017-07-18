import React from 'react';
import PropTypes from 'prop-types';

import Tabs, { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SwipeableViews from 'react-swipeable-views';

import PrettyTextStats from './PrettyTextStats';
import TableStats from './TableStats';
import GraphStats from './GraphStats';

import Error from './Error';

export default class BuildsPage  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    }
  }

  handleChange = (value) => {
    this.setState({
      index: value,
    });
  };

  render() {
    const { index } = this.state;

    const { isFetching, builds, repository, error, handleBack } = this.props;
    // console.log(error, isFetching);
    let innerComponent = (null);
    if (isFetching) {
      innerComponent = <CircularProgress size={100} thickness={6} />;
    } else if (error) {
      innerComponent = (
        <div>
          <p>
            <RaisedButton primary={true} onClick={() => handleBack()} label="Back"/>
          </p>
          <Error repository={repository}/>
        </div>
      );
    } else {
      if (builds != null && builds.length > 0) {
        innerComponent = (
          <div>
            <p>
              <RaisedButton primary={true} onClick={() => handleBack()} label="Back"/>
            </p>
            <div>
            <Tabs value={index} onChange={this.handleChange}>
              <Tab label="Pretty"  value={0} />
              <Tab label="Table" value={1} />
              <Tab label="Graphs"  value={2} />
            </Tabs>
            <SwipeableViews index={index} onChangeIndex={this.handleChange}>
              <PrettyTextStats builds={builds} repository={repository} />
              <TableStats builds={builds} />
              <GraphStats builds={builds} />
            </SwipeableViews>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="buildsPage">
        {innerComponent}
      </div>
    );
  }
};

BuildsPage.propTypes = {
  isFetching: PropTypes.bool,
  builds: PropTypes.array.isRequired,
  repository: PropTypes.string.isRequired,
  error: PropTypes.bool,
  handleBack: PropTypes.func.isRequired,
};

BuildsPage.defaultProps = {
  isFetching: null,
  error: null,
};
