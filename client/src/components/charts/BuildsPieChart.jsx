import React from 'react';
import PropTypes from 'prop-types';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { buildsUtils } from 'travis-builds-reporter-core';

const COLORS = ['green', 'grey', 'red', 'orange'];

const BuildsPieChart = (props) => {
  const { builds } = props;

  const successfulBuilds = buildsUtils.getSuccessfulBuilds(builds);
  const canceledBuilds = buildsUtils.getCanceledBuilds(builds);
  const failedBuilds = buildsUtils.getFailedBuilds(builds);
  const erroredBuilds = buildsUtils.getErroredBuilds(builds);

  const pieChartData = [
    { name: 'Successful builds', value: successfulBuilds.length },
    { name: 'Canceled builds', value: canceledBuilds.length },
    { name: 'Failed builds', value: failedBuilds.length },
    { name: 'Errored builds', value: erroredBuilds.length },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ left: "auto", right: "auto", top: 50, bottom: 50 }}>
        <Tooltip label="test"/>
        <Pie
          data={pieChartData}
          dataKey="name"
          valueKey="value"
          outerRadius={120}
          labelLine={false}
          label
          tooltip
        >
          {
            pieChartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

BuildsPieChart.propTypes = {
  builds: PropTypes.array.isRequired,
};

export default BuildsPieChart;
