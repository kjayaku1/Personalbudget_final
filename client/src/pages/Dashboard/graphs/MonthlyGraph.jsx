import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import "./monthly-graph.scss";

function MonthlyGraph(props) {
  const { dailySum, date } = props;
  let data = [];

  // categorie.forEach((element) => {
  //   data.push(dashboardGraph?.monthlyLogin[element] || 2);
  // });

  // console.log("data", data);

  // Get the current month
  const currentMonth = moment(date).format("MMMM");

  // Get the number of days in the current month
  const daysInMonth = moment(date).daysInMonth();

  // Create an array representing the days of the current month
  const monthArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const dashboardAmountGraph =
    dailySum?.map((item) => ({
      date: moment(item?._id).local().date(),
      amount: item?.totalAmount,
    })) || [];

  for (let i = 0; i < monthArray.length; i++) {
    const currentDate = monthArray[i];
    const match = dashboardAmountGraph.find(
      (item) => item.date === currentDate
    ); // Check if the date exists in listValue

    if (match) {
      data.push(match.amount); // Push the amount if the date is found
    } else {
      data.push(0); // Otherwise, push 0
    }
  }

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#0B2546"],
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ["#0B2546", "#7ce7ac", "#f4be5e"],
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#0B2546", "#7ce7ac", "#f4be5e"],
    },
    series: [
      {
        name: "Total Spending",
        data: JSON.stringify(data) !== "[]" ? data : monthArray?.map((i) => 0),
      },
      //   {
      //     name: 'Verfied',
      //     data: [],
      //   },
      //   {
      //     name: 'Completed',
      //     data: [],
      //   },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.6,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: true,
        },
      },
      column: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.3,
      },
    },
    xaxis: {
      categories: monthArray,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (value, series) {
          // use series argument to pull original string from chart data
          return `&#36;${value}`;
        },
      },
    },
  };

  return (
    <div variant="outlined" className="card mb-3">
      <div className="graph-con p-3">
        <div className="graph-title">
          <h2 className="">Daily Expenses</h2>
          <p>{currentMonth}</p>
        </div>
        <Chart
          options={options}
          series={options.series}
          type="area"
          height="85%"
          width="100%"
          className="px-0 mt-2"
        />
      </div>
    </div>
  );
}

export default MonthlyGraph;
