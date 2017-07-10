import React from 'react';
import PropTypes from 'prop-types';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { buildsUtils } from 'travis-builds-reporter-core';

const BuildsHistoryChart = (props) => {

  const slicedBuilds = buildsUtils.sliceBuildsByDate(props.builds);

  const data = slicedBuilds.map(entry => ({
    name: (entry[0].started_at || entry[0].finished_at).substring(0, 10), value: entry.length,
  }));

  return (
    <ResponsiveContainer height={400} width="80%">
      <LineChart data={data}
                 margin={{ top: 50, bottom: 50 }}>
        <XAxis dataKey="name" label="Date" />
        <YAxis dataKey="value" label="Builds count" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" label="# Builds" name="builds" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

BuildsHistoryChart.propTypes = {
  builds: PropTypes.array.isRequired,
};

export default BuildsHistoryChart;
