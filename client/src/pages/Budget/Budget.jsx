import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Datetime from "react-datetime";
import moment from "moment";
import AuthServices from "../../api/services/auth-services";
import { GlobalContext, actions } from "../../context";
import "./budget.scss";

const category = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Medical & Healthcare",
  "Saving, Investing, & Debt Payments",
  "Personal Spending",
  "Recreation & Entertainment",
  "Miscellaneous",
];

function Budget() {
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [selectedDate, setSelectedDate] = useState(moment());
  // console.log(selectedDate.toISOString(), 'selectedDate');
  const [data, setData] = useState({
    title: "",
    category: "",
    amount: "",
    amountText: "",
  });
  const [budgetData, setBudgetData] = useState([]);
  // console.log("budgetData", budgetData);
  const [budgetList, setBudgetList] = useState([]);
  // console.log("budgetList", budgetList);

  const onChangeData = (value, key) => {
    if (key === "amount") {
      const rawValue = value.replace(/[^0-9.]/g, "");
      const formattedValue = `$${rawValue}`;
      setData((prev) => ({
        ...prev,
        [key]: Number(rawValue).toFixed(2),
        amountText: formattedValue,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const onChangBudgetDate = (changedData) => {
    let budget =
      budgetData.length > 0
        ? budgetData?.filter(
            (list) =>
              moment(list.date).local().format("YYYY-MM-DD") ===
              moment(changedData).local().format("YYYY-MM-DD")
          )
        : [];

    setBudgetList(budget);
  };

  const onClickEditBudget = (id) => {
    const editBudgetData = budgetList.map((budget) =>
      budget?._id === id ? { ...budget, edit: !budget.edit } : budget
    );
    setBudgetList(editBudgetData);
  };

  const deleteBudgetListData = (id) => {
    // console.log("deleteTodoListData", id);
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.removeBudget(id)
      .then((response) => {
        // console.log(response.message);
        storeHandler(actions.SHOW_LOADER, false);
        toast.success(response?.message);
        getBudgetLists();
      })
      .catch((error) => {
        // console.log(error.data.message);
        storeHandler(actions.SHOW_LOADER, false);
        toast.error(error.data.message);
      });
  };

  const budgetUpdateData = (value, id, key) => {
    if (key === "amount") {
      const rawValue = value.replace(/[^0-9.]/g, "");
      const formattedValue = `$${rawValue}`;
      const updateBudgetData = budgetList.map((budget) =>
        budget?._id === id
          ? {
              ...budget,
              [key]: Number(rawValue).toFixed(2),
              amountText: formattedValue,
            }
          : budget
      );
      setBudgetList(updateBudgetData);
    } else {
      const updateBudgetData = budgetList.map((budget) =>
        budget?._id === id ? { ...budget, [key]: value } : budget
      );
      setBudgetList(updateBudgetData);
    }
  };

  const updateBudgetItemData = (id) => {
    const filteredData = budgetList.filter((budget) => budget?._id === id);
    let sendData = {
      title: filteredData[0].title,
      category: filteredData[0].category,
      amount: parseFloat(filteredData[0].amount),
    };
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.updateBudget(filteredData[0]._id, sendData)
      .then((response) => {
        storeHandler(actions.SHOW_LOADER, false);
        toast.success(response?.message);
        getBudgetLists();
      })
      .catch((error) => {
        storeHandler(actions.SHOW_LOADER, false);
        toast.error(error.data.message);
      });
  };

  const addBudgetListData = () => {
    if (data.title === "" || data.category === "" || data.amount === "") {
      toast.error("Fill all the fields");
    } else {
      storeHandler(actions.SHOW_LOADER, true);
      let sendData = {
        title: data?.title,
        category: data?.category,
        amount: parseFloat(data?.amount),
        date: new Date(selectedDate).toISOString(),
      };
      // console.log(sendData);
      AuthServices.addBudgets(sendData)
        .then((response) => {
          setData({
            title: "",
            category: "",
            amount: "",
            amountText: "",
          });
          storeHandler(actions.SHOW_LOADER, false);
          toast.success(response?.message);
          getBudgetLists();
        })
        .catch((error) => {
          storeHandler(actions.SHOW_LOADER, false);
          toast.error(error.data.message);
        });
    }
  };

  const getBudgetLists = () => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.getBudgets()
      .then((budgets) => {
        let addEditData =
          budgets.length > 0
            ? budgets.map((item) => ({ ...item, edit: false }))
            : [];
        setBudgetData(addEditData);

        let budget =
          addEditData.length > 0
            ? addEditData?.filter(
                (list) =>
                  moment(list.date).local().format("YYYY-MM-DD") ===
                  moment(selectedDate).local().format("YYYY-MM-DD")
              )
            : [];

        setBudgetList(budget);

        storeHandler(actions.SHOW_LOADER, false);
      })
      .catch((error) => {
        console.log("error", error);
        storeHandler(actions.SHOW_LOADER, false);
      });
  };

  useEffect(() => {
    getBudgetLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container pb-5">
        <div className="row header-title">{/* <h2>Expenses</h2> */}</div>
        <div className="row mb-3">
          <div variant="outlined" className="card p-4">
            <div className="budget-page-container">
              <div className="budget-date-con">
                <div className="budget-date">
                  <label htmlFor="date" className="ms-1 mb-2">
                    Select Date
                  </label>
                  <Datetime
                    className="mt-datePicker"
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                    closeOnSelect={true}
                    name="date"
                    id="date "
                    inputProps={{ placeholder: "Enter the date" }}
                    defaultValue={selectedDate}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event);
                      onChangBudgetDate(event);
                    }}
                  />
                </div>
              </div>
              <div className="budget-add-con" onSubmit={() => {}}>
                <div className="form-floating">
                  <input
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter Title"
                    value={data?.title}
                    onChange={(e) => onChangeData(e.target.value, "title")}
                  />
                  <label htmlFor="title">Enter title</label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    value={data?.category}
                    onChange={(e) => onChangeData(e.target.value, "category")}
                  >
                    <option value="">Select the category</option>
                    {category?.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                  <label for="floatingSelect">Select the category</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="currency-field"
                    id="currency-field"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    data-type="currency"
                    placeholder="Enter Amount"
                    value={data?.amountText}
                    onChange={(e) => onChangeData(e.target.value, "amount")}
                  />
                  <label for="floatingSelect">Enter Amount</label>
                </div>
                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm px-3 mb-3"
                    onClick={addBudgetListData}
                  >
                    <i class="fa fa-plus fa-sm me-2" /> Add
                  </button>
                </div>
              </div>
              <div className="budget-list-con">
                {/* <h4 className="budget-list-title">
                  {moment(selectedDate).format("DD-MM-YYYY")}
                </h4>
                <p className="budget-list-title text-center">Expenses Lists</p> */}
                <div className="budget-list">
                  <div>
                    {budgetList.length > 0 ? (
                      budgetList.map((expense) =>
                        expense?.edit ? (
                          <div
                            key={expense?._id}
                            dense
                            className="py-3 rounded d-flex justify-content-around"
                          >
                            <div className="form-floating">
                              <input
                                name="title"
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Enter Title"
                                defaultValue={expense?.title}
                                onChange={(e) =>
                                  budgetUpdateData(
                                    e.target.value,
                                    expense?._id,
                                    "title"
                                  )
                                }
                              />
                              <label htmlFor="title">Enter title</label>
                            </div>
                            <div className="form-floating">
                              <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                defaultValue={expense?.category}
                                onChange={(e) =>
                                  budgetUpdateData(
                                    e.target.value,
                                    expense?._id,
                                    "category"
                                  )
                                }
                              >
                                <option value="">Select the category</option>
                                {category?.map((item) => (
                                  <option value={item}>{item}</option>
                                ))}
                              </select>
                              <label for="floatingSelect">
                                Select the category
                              </label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                className="form-control"
                                type="text"
                                name="currency-field"
                                id="currency-field"
                                pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                                data-type="currency"
                                placeholder="Enter Amount"
                                defaultValue={expense?.amount}
                                onChange={(e) =>
                                  budgetUpdateData(
                                    e.target.value,
                                    expense?._id,
                                    "amount"
                                  )
                                }
                              />
                              <label for="floatingSelect">Enter Amount</label>
                            </div>
                            <button
                              className="btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center px-3 mb-3"
                              onClick={() => updateBudgetItemData(expense._id)}
                            >
                              <i class="fa fa-check fa-sm me-2" />
                              Update
                            </button>
                          </div>
                        ) : (
                          <div className="expense-list d-flex justify-content-center align-items-center">
                            <p style={{ width: "30%" }}>{expense?.title}</p>
                            <p style={{ width: "35%" }}>{expense?.category}</p>
                            <p style={{ width: "15%" }}>
                              &#36; {expense?.amount}
                            </p>
                            <div
                              style={{ width: "20%" }}
                              className="d-flex justify-content-end align-items-center"
                            >
                              <button
                                className="btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center px-3 mb-3 me-2"
                                onClick={() => onClickEditBudget(expense?._id)}
                              >
                                <i class="fa fa-pencil fa-sm me-2" /> Edit
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center px-3 mb-3"
                                onClick={() =>
                                  deleteBudgetListData(expense?._id)
                                }
                              >
                                <i
                                  class="fa fa-trash fa-sm me-2"
                                  style={{ color: "#ff0000" }}
                                />
                                Delete
                              </button>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <div className="text-center my-3 font-error">
                        Expenses not found on selected date
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Budget;
