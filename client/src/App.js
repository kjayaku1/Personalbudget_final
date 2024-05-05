import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { Loader } from "./components";
import { GlobalContext, actions } from "./context";
import { PublicRoute, PrivateRoute } from "./routes";
import PreLoginLayout from "./layout/PreLoginLayout";
import PostLoginLayout from "./layout/PostLoginLayout";
import Landing from "./pages/Landing";
import './App.css';
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budget from "./pages/Budget/Budget";

import "react-datetime/css/react-datetime.css";
import MonthExpenses from "./pages/MonthExpenses/MonthExpenses";

const toastOptions = {
  loading: {
    duration: 3000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
    style: {
      background: '#363636',
      color: '#fff',
      width: '100%',
    },
  },
  success: {
    duration: 3000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
    style: {
      background: '#363636',
      color: '#fff',
      width: '100%',
    },
  },
  error: {
    duration: 3000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
    style: {
      background: '#363636',
      color: '#fff',
      width: '100%',
    },
  },
};

function App() {
  const {
    state: { showLoader, isLoggedIn },
    dispatch,
  } = useContext(GlobalContext);


  const storeHandler = (type, payload) => dispatch({ type, payload });
  let token = localStorage.getItem("authToken");

  useEffect(() => {
    const validateLogIn = () => {
      storeHandler(actions.LOG_IN, !!token);
    };

    validateLogIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const abortController = new AbortController();

    // localStorage.setItem("adminstate", JSON.stringify({"loginData":{"auth":false,"authData":"","authToken":""}}));

    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      {showLoader && <Loader />}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName=""
        toastOptions={toastOptions}
      />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn || !!token ? '/dashboard' : "/home"} />} />
          <Route
            index
            exact
            path="/home"
            element={PublicRoute(Landing, PreLoginLayout)}
          />
          <Route
            index
            exact
            path="/login"
            element={PublicRoute(Login, PreLoginLayout)}
          />
          <Route
            index
            exact
            path="/signup"
            element={PublicRoute(Signup, PreLoginLayout)}
          />
          <Route
            index
            exact
            path="/dashboard"
            element={PrivateRoute(Dashboard, PostLoginLayout)}
          />
          <Route
            index
            exact
            path="/expenses"
            element={PrivateRoute(Budget, PostLoginLayout)}
          />
          <Route
            index
            exact
            path="/month-expenses"
            element={PrivateRoute(MonthExpenses, PostLoginLayout)}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
