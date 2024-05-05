import React from "react";
import Chart from "react-apexcharts";
import "./monthly-graph.scss";

function CategorySpendingsPieChart(props) {
  const { categoryAmounts } = props;

  let categories = categoryAmounts?.map((item) => item?._id) || [];
  let totalAmounts = categoryAmounts?.map((item) => item?.totalAmount) || [];

  const options = {
    labels: categories,
    series: totalAmounts,
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
      "#64b5f6",
      "#81c784",
      "#ffb74d",
      "#ba68c8",
      "#4db6ac",
      "#ff8a65",
      "#a1887f",
      "#90a4ae",
      "#aed581",
      "#ffcc80",
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
          return "$" + value;
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

export default CategorySpendingsPieChart;
