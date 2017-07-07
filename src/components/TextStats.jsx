import React from 'react';
import PropTypes from 'prop-types';

import { buildsUtils } from 'travis-builds-reporter-core';

import BuildStat from './BuildStat';

const TextStats = (props) => {
  if (props.builds != null && props.builds.length > 0) {
    return (
      <div>
        <BuildStat
          label="Total builds count: "
          value={buildsUtils.getBuildsCount(props.builds)}
        />
        <BuildStat
          label="Successful builds count: "
          value={buildsUtils.getSuccessfulBuildsCount(props.builds)}
        />
        <BuildStat
          label="Canceled builds count: "
          value={buildsUtils.getCanceledBuildsCount(props.builds)}
        />
        <BuildStat
          label="Failed builds count: "
          value={buildsUtils.getFailedBuildsCount(props.builds)}
        />
        <BuildStat
          label="Errored builds count: "
          value={buildsUtils.getErroredBuildsCount(props.builds)}
        />
        <BuildStat
          label="Successful builds rate: "
          value={(buildsUtils.getSuccessfulBuildsRate(props.builds) * 100).toFixed(2)}
          unit="%"
        />
        <BuildStat
          label="Average builds duration: "
          value={buildsUtils.getAverageBuildsDuration(props.builds, 2)}
          unit="s"
        />
        <BuildStat
          label="Minimum builds duration: "
          value={buildsUtils.getMinimumBuildsDuration(props.builds)}
          unit="s"
        />
        <BuildStat
          label="Maximum builds duration: "
          value={buildsUtils.getMaximumBuildsDuration(props.builds)}
          unit="s"
        />
      </div>
    );
  }
  return (null);
};

TextStats.propTypes = {
  builds: PropTypes.array.isRequired,
};

export default TextStats;
