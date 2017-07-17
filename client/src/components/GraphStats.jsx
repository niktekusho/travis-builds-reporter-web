import React from 'react';
import PropTypes from 'prop-types';

import BuildsPieChart from './charts/BuildsPieChart';
import BuildsHistoryChart from './charts/BuildsHistoryChart';

const GraphStats = (props) => {
  const { builds } = props;
  if (builds && builds.length > 0) {
    return (
      <div className="charts-container">
        <BuildsPieChart builds={builds} />
        <BuildsHistoryChart builds={builds} />
      </div>
    );
  }
  return (null);
};

GraphStats.propTypes = {
  builds: PropTypes.array.isRequired,
};

export default GraphStats;
