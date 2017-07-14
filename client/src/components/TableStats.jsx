import React from 'react';
import PropTypes from 'prop-types';

import { buildsUtils } from 'travis-builds-reporter-core';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TableRowStat = (props) => {
  return (
    <TableRow>
      <TableRowColumn>{props.metric}</TableRowColumn>
      <TableRowColumn>{props.value}</TableRowColumn>
      <TableRowColumn>{props.unit}</TableRowColumn>
    </TableRow>
  );
};

TableRowStat.propTypes = {
  metric: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
};

TableRowStat.defaultProps = {
  unit: 'n.d.',
};

const TableStats = (props) => {
  const builds = props.builds;
  if (builds != null && builds.length > 0) {
    return (
      <Table>
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
        >
          <TableHeaderColumn>Metric</TableHeaderColumn>
          <TableHeaderColumn>Value</TableHeaderColumn>
          <TableHeaderColumn>Unit</TableHeaderColumn>
        </TableHeader>
        <TableBody>
          <TableRowStat metric="Total builds" value={buildsUtils.getBuildsCount(builds)} unit="# builds"/>
          <TableRowStat metric="Successful builds" value={buildsUtils.getSuccessfulBuildsCount(builds)} unit="# builds"/>
          <TableRowStat metric="Canceled builds" value={buildsUtils.getCanceledBuildsCount(builds)} unit="# builds"/>
          <TableRowStat metric="Errored builds" value={buildsUtils.getErroredBuildsCount(builds)} unit="# builds"/>
          <TableRowStat metric="Failed builds" value={buildsUtils.getFailedBuildsCount(builds)} unit="# builds"/>
          <TableRowStat metric="Successful builds rate" value={(buildsUtils.getSuccessfulBuildsRate(builds) * 100).toFixed(2)} unit="%"/>
          <TableRowStat metric="Average builds duration" value={buildsUtils.getAverageBuildsDuration(builds, 2)} unit="seconds"/>
          <TableRowStat metric="Minimum builds duration" value={buildsUtils.getMinimumBuildsDuration(builds)} unit="seconds"/>
          <TableRowStat metric="Maximum builds duration" value={buildsUtils.getMaximumBuildsDuration(builds)} unit="seconds"/>
        </TableBody>
      </Table>
    );
  }
  return (null);
};

TableStats.propTypes = {
  builds: PropTypes.array.isRequired,
};

export default TableStats;
