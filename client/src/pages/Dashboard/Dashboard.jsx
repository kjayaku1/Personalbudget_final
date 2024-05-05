import React, { useState, useContext, useEffect } from "react";
// import toast from "react-hot-toast";
// import Datetime from "react-datetime";
import moment from "moment";
import AuthServices from "../../api/services/auth-services";
import { GlobalContext, actions } from "../../context";
import MonthlyGraph from "./graphs/MonthlyGraph";
import YearlyGraph from "./graphs/YearlyGraph";
import CategoryPieChart from "./graphs/CategoryPieChart";
// import CategorySpendingsPieChart from "./graphs/CategorySpendingsPieChart";

function Dashboard() {
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  // const [selectedDate, setSelectedDate] = useState(moment());
  let selectedDate = moment();
  const [budgetList, setBudgetList] = useState(null);

  const getDashboardData = (date) => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.dashboard({
      fromDate: moment(date).startOf("month"),
      toDate: moment(date).endOf("month"),
    })
      .then((budgets) => {
        setBudgetList(budgets);

        storeHandler(actions.SHOW_LOADER, false);
      })
      .catch((error) => {
        console.log("error", error);
        storeHandler(actions.SHOW_LOADER, false);
      });
  };

  useEffect(() => {
    // console.log(selectedDate);
    getDashboardData(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="row header-title">{/* <h2>Dashboard</h2> */}</div>
      <div>
        <YearlyGraph
          date={selectedDate}
          monthlyData={budgetList?.monthlyData}
        />
        <MonthlyGraph date={selectedDate} dailySum={budgetList?.dailySum} />
        {budgetList?.categoryPercentages?.length > 0 ? (
          <div className="d-flex pb-5">
            <CategoryPieChart
              categoryPercentages={budgetList?.categoryPercentages}
            />
            {/* <CategorySpendingsPieChart
            categoryAmounts={budgetList?.categorySums}
          /> */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
