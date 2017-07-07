import React from 'react';
import PropTypes from 'prop-types';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import PrettyTextStats from './PrettyTextStats';
import TextStats from './TextStats';

// Material-UI Theme
const muiTheme = getMuiTheme();

export default class BuildsPage  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    }
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({
      index: value,
    });
  };

  render() {
    const { index } = this.state;

    const { isFetching, builds, repository } = this.props;
    if (isFetching) {
      return <div><h3>loading...</h3></div>;
    } else {
      if (builds != null && builds.length > 0) {
        return (
          <div>
            <Tabs index={index} onChange={this.handleChange}>
              <Tab label="Pretty"  value={0} />
              <Tab label="Table" value={1} />
              <Tab label="WIP"  value={2} />
            </Tabs>
            <SwipeableViews index={index} onIndexChange={this.handleChange}>
              <PrettyTextStats builds={builds} repository={repository} />
              <TextStats builds={builds} />
              <p>WIP</p>
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