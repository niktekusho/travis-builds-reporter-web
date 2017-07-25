import React from 'react';
import PropTypes from 'prop-types';

import buildsUtils from 'travis-builds-reporter-utils';

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
      <div className="pretty-div">
        <p>
          The repository <span className="pretty-span pretty-repo">{props.repository}</span> has a total of <span className="pretty-span">{buildsCount} builds</span>.
        </p>
        <p>
          <span className="pretty-span">{successCount} builds </span> <span className="pretty-span builds-ok">succeeded</span> (about <span className="pretty-span pretty-percent">{successRate} %</span>), while <span className="pretty-span">{canceledCount} builds</span> were <span className="pretty-span builds-cancel">canceled</span>.
        </p>
        <p>
          <span className="pretty-span">{failedCount + erroredCount}</span> builds were <span className="pretty-span builds-error">not completed due to errors</span>.
        </p>
        <p>
          The average builds duration time is <span className="pretty-span builds-time">{avgDuration} seconds</span> [<span className="pretty-span builds-time">{minDuration} seconds</span>, <span className="pretty-span builds-time">{maxDuration} seconds</span>].
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
