import React from 'react';
import PropTypes from 'prop-types';

const BuildStat = (props) => (
  <p>
    <span>{props.label}</span>
    <span className="stat-value">{props.value}</span>

    <span className="stat-mu">{props.unit}</span>
  </p>
);

BuildStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
};

BuildStat.defaultProps = {
  unit: '',
};

export default BuildStat;
