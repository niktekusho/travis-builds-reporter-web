import React from 'react';
import PropTypes from 'prop-types';

import { buildsUtils } from 'travis-builds-reporter-core';

const PrettyTextStats = (props) => {
  if (props.builds != null && props.builds.length > 0) {
    const builds = props.builds;
    const buildsCount = buildsUtils.getBuildsCount(builds);
    const successCount = buildsUtils.getSuccessfulBuildsCount(builds);
    const canceledCount = buildsUtils.getCanceledBuildsCount(builds);
    const failedCount = buildsUtils.getFailedBuildsCount(builds);
    const erroredCount = buildsUtils.getErroredBuildsCount(builds);
    const successRate = (buildsUtils.getSuccessfulBuildsRate(builds) * 100).toFixed(2);
    const avgDuration = buildsUtils.getAverageBuildsDuration(builds, 2);
    const minDuration = buildsUtils.getMinimumBuildsDuration(builds);
    const maxDuration = buildsUtils.getMaximumBuildsDuration(builds);

    return (
      <div>
        <p>
          The repository <span>{props.repository}</span> has a total of <span>{buildsCount}</span> builds.
        </p>
        <p>
          <span>{successCount}</span> builds succeeded (about <span>{successRate} %</span>), while <span>{canceledCount}</span> builds were canceled.
        </p>
        <p>
          <span>{failedCount + erroredCount}</span> builds were not completed due to errors.
        </p>
        <p>
          The average builds duration time is <span>{avgDuration} seconds</span> [<span>{minDuration} seconds</span>, <span>{maxDuration} seconds</span>].
        </p>
      </div>
    );
  }
  return (null);
};

PrettyTextStats.propTypes = {
  builds: PropTypes.array.isRequired,
  repository: PropTypes.string.isRequired,
};

export default PrettyTextStats;
