import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import "./monthly-graph.scss";

function YearlyGraph(props) {
  const { monthlyData, date } = props;
  const categories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let monthsData =
    monthlyData?.map((month) => month?.totalAmount || 0) ||
    categories?.map((i) => 0);

  const options = {
    series: [
      {
        name: "Total Spending",
        data: monthsData,
      },
    ],
    chart: {
      toolbar: {
        show: false, // Hides the toolbar including the hamburger menu
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val !== 0 ? `$${val}` : "";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#0B2546"],
      },
    },
    colors: ["#0B2546"],
    xaxis: {
      categories: categories,
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.6,
            stops: [0, 90, 100],
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val !== 0 ? `$${val}` : "";
        },
      },
    },
  };

  return (
    <div variant="outlined" className="card mb-3">
      <div className="graph-con p-3">
        <div className="graph-title">
          <h2 className="">Monthly Expenses</h2>
          <p>{moment(date).year()}</p>
        </div>
        <Chart
          options={options}
          series={options.series}
          type="bar"
          height="85%"
          width="100%"
          className="px-0 mt-2"
        />
      </div>
    </div>
  );
}

export default YearlyGraph;
