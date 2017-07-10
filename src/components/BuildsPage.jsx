import React from 'react';
import PropTypes from 'prop-types';

import Tabs, { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import SwipeableViews from 'react-swipeable-views';

import PrettyTextStats from './PrettyTextStats';
import TableStats from './TableStats';
import GraphStats from './GraphStats';

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

    const { isFetching, builds, repository } = this.props;
    if (isFetching) {
      return <div><CircularProgress size={100} thickness={6} /></div>;
    } else {
      if (builds != null && builds.length > 0) {
        return (
          <div>
            <Tabs index={index} onChange={this.handleChange}>
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
        );
      }
    }
    return (null);
  }

};

BuildsPage.propTypes = {
  isFetching: PropTypes.bool,
  builds: PropTypes.array.isRequired,
  repository: PropTypes.string.isRequired,
};

BuildsPage.defaultProps = {
  isFetching: null,
};
