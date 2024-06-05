// components/GoogleLineGraph.js
import React from 'react';
import { Chart } from 'react-google-charts';

const GoogleLineGraph = ({ data }) => {
  const chartData = [
    ['X', 'Y'],
    ...data.map(point => [point.x, point.y])
  ];

  const options = {
    title: 'Line Graph',
    hAxis: { title: 'X' },
    vAxis: { title: 'Y' },
    legend: 'none',
  };

  return (
    <Chart
      chartType="LineChart"
      width="500px"
      height="250px"
      data={chartData}
      options={options}
    />
  );
};

export default GoogleLineGraph;
