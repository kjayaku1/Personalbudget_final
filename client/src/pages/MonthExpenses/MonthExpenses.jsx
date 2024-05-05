import React, { useState, useContext, useEffect } from "react";
// import toast from "react-hot-toast";
import Datetime from "react-datetime";
import moment from "moment";
import AuthServices from "../../api/services/auth-services";
import { GlobalContext, actions } from "../../context";
import "./monthExpenses.scss";

function MonthExpenses() {
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [selectedDate, setSelectedDate] = useState(moment());
  const [budgetList, setBudgetList] = useState(null);

  const getBudgetLists = (date) => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.getBudgetTable({
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
    getBudgetLists(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSelectedDate = (event) => {
    setSelectedDate(event);
    getBudgetLists(event);
  };

  return (
    <div className="container pb-5 month-expense-con">
      <div className="row header-title">{/* <h2>Monthly Expenses</h2> */}</div>
      <div className="card-amount row justify-content-center mb-3">
        <div className="col-4">
          <div variant="outlined" className="card p-4">
            <div className="d-flex justify-content-around align-items-center">
              <span>Total Expenses:</span>
              <h4 className="m-0">&#36; {budgetList?.totalAmount || 0}</h4>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div variant="outlined" className="card p-3">
            <Datetime
              className="mt-datePicker"
              dateFormat="MMMM yyyy"
              timeFormat={false}
              closeOnSelect={true}
              showMonthYearPicker
              name="date"
              id="date "
              inputProps={{ placeholder: "Enter the date" }}
              //   minDate={moment().subtract(5, "years")}
              //   maxDate={moment().add(25, "years")}
              defaultValue={selectedDate}
              value={selectedDate}
              onChange={(event) => {
                onChangeSelectedDate(event);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div variant="outlined" className="card p-4">
          <div className="table-responsive">
            <table className="table table-light table-hover table-bordered border-light">
              <thead className="table-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {budgetList?.budget?.length > 0 ? (
                  budgetList?.budget?.map((item, i) => (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{moment(item?.date).format("DD-MM-YYYY")}</td>
                      <td>{item?.title}</td>
                      <td>{item?.category}</td>
                      <td>&#36; {item?.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="4" className="text-center">
                      No record found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthExpenses;
