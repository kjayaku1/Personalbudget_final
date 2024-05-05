import React from "react";
import Chart from "react-apexcharts";
import "./monthly-graph.scss";

function CategoryPieChart(props) {
  const { categoryPercentages } = props;

  let categories = categoryPercentages?.map((item) => item?.category) || [];
  let percentages = categoryPercentages?.map((item) => item?.percentage) || [];

  const options = {
    labels: categories,
    series: percentages,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "right",
      formatter: function (seriesName, opts) {
        return seriesName;
      },
    },
    colors: [
      "#ff8a65", // Orange
      "#64b5f6", // Blue
      "#9575cd", // Purple
      "#4db6ac", // Teal
      "#ffb74d", // Amber
      "#81c784", // Green
      "#f06292", // Pink
      "#4fc3f7", // Light Blue
      "#ba68c8", // Deep Purple
      "#aed581", // Light Green
    ],
    responsive: [
      {
        breakpoint: 789,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
  };

  return (
    <div className="card pie-con justify-content-center p-3">
      <Chart
        options={options}
        series={options.series}
        type="pie"
        // height="100%"
        // width="100%"
        className="px-0 mt-2"
      />
    </div>
  );
}

export default CategoryPieChart;
