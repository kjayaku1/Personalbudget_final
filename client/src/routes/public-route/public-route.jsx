import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context";

// handle the public routes

function PublicRoute(Component, PreLoginLayout) {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);

  const {
    state: { isLoggedIn },
  } = useContext(GlobalContext);

  const token = !!localStorage.getItem("authToken");

  // return !isLoggedIn ? <PreLoginLayout> <Component /> </PreLoginLayout>: <Navigate replace to="/nhub" />

  useEffect(() => {
    if (isLoggedIn || token) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, token]);

  const menuList = [
    {
      text: "Home",
      to: "/home",
      icon: <i class="fa fa-home fa-lg me-2" />,
    },
    // {
    //   text: "About",
    //   to: "/",
    // },
    // {
    //   text: "Google",
    //   to: "/",
    // },
    {
      text: "Login",
      to: "/login",
      icon: <i class="fa fa-id-badge fa-lg me-2" />,
    },
  ];

  return (
    <PreLoginLayout>
      <div className="menu" role="navigation">
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
      </div>
      <Component />
      <div class="copyright">
        <p>&#169; All rights reserved | Kalai Arasi Jayakumar</p>
      </div>
    </PreLoginLayout>
  );
}

export default PublicRoute;
