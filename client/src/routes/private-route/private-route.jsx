import React, { useState, useEffect, useContext } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { GlobalContext } from "../../context";
import Logout from "../../utils/logout";

// handle the private routes

const menuList = [
  {
    text: "Dashboard",
    to: "/dashboard",
    icon: <i class="fa fa-codiepie fa-lg me-2" />,
  },
  {
    text: "Expenses",
    to: "/expenses",
    icon: <i class="fa fa-dollar fa-sm me-2" />,
  },
  {
    text: "Monthly Report",
    to: "/month-expenses",
    icon: <i class="fa fa-calendar fa-sm me-2" />,
  },
];

function PrivateRoute(Component, PostLoginLayout) {
  const location = useLocation();
  const {
    state: { isLoggedIn },
  } = useContext(GlobalContext);

  const token = !!localStorage.getItem("authToken");

  const [seconds, setSeconds] = useState(
    localStorage.getItem("countdownSeconds") || 120
  ); // Default to 2 minutes
  const [countRed, setCountRed] = useState(false);

  useEffect(() => {
    let intervalId;

    if (seconds > 0 && (isLoggedIn || token)) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          localStorage.setItem("countdownSeconds", newSeconds); // Store countdown value in localStorage
          return newSeconds;
        });
      }, 1000);
    }

    if (seconds === 60) {
      toast.error("Token expires in 1 min", { id: "token" });
    }

    if (seconds <= 60) {
      setCountRed(true);
    }

    if (seconds <= 0) {
      toast.error("Token expired. Login now!", { id: "tokenExpired" });
      Logout();
    }

    return () => clearInterval(intervalId);
  }, [isLoggedIn, seconds, token]);

  // Format the seconds to display as mm:ss
  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(
    2,
    "0"
  )}:${String(seconds % 60).padStart(2, "0")}`;

  return isLoggedIn || token ? (
    <PostLoginLayout>
      <div className="menu d-flex justify-content-between" role="navigation">
        <ul>
          {menuList?.map((item) => (
            <li>
              <Link
                to={item?.to}
                className={`${
                  location.pathname === item?.to ? "active" : ""
                } mt-2 mb-1 mx-2`}
              >
                {item?.icon}
                {item?.text}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <li
            className={`count-down ${
              countRed ? "count-text-red" : ""
            } mt-2 mb-1 mx-2`}
          >
            {formattedTime}
          </li>
          <li>
            <Link className={`mt-2 mb-1`} onClick={() => Logout()}>
              Logout <i class="fa fa-arrow-right fa-lg ms-2" />
            </Link>
          </li>
        </ul>
      </div>
      <Component />
      <div class="copyright">
        <p>&#169; All rights reserved | Kalai Arasi Jayakumar</p>
      </div>
    </PostLoginLayout>
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
