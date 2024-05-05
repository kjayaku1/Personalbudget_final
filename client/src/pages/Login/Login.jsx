import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./login.scss";
import AuthServices from "../../api/services/auth-services";
import { GlobalContext, actions } from "../../context";

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onSubmitUserData = (event) => {
    event.preventDefault();

    // console.log(event.target['email'].value);

    if (userData.email === "" || userData.password === "") {
      // console.log("Fill all fields");
      toast.error("Fill all the fields");
    } else {
      // console.log(userData);
      storeHandler(actions.SHOW_LOADER, true);
      AuthServices.login(userData)
        .then((res) => {
          storeHandler(actions.SHOW_LOADER, false);
          storeHandler(actions.LOG_IN, true);
          localStorage.setItem("authToken", res.access_token);
          // localStorage.setItem("refreshToken", res.access_token);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("userName", res.userName);
          // localStorage.setItem("countdownSeconds", 120);
          toast.success(res?.message);
          // console.log("logined", res);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        })
        .catch((error) => {
          storeHandler(actions.SHOW_LOADER, false);
          toast.error(error.data.message);
        });
    }
  };

  return (
    <div className="login_cont container">
      <div className="row">
        <div className="col">
          <div className="login_box">
            <form onSubmit={onSubmitUserData}>
              <div className="d-flex justify-content-center">
                {/* <img src={Logo} alt="Logo" className="logo_img" /> */}
              </div>
              <h4 className="text-center mt-2 mb-3" color="secondary">
                Log In to Personal Budget
              </h4>

              <div class="form-floating mb-3">
                <input
                  name="email"
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                  value={userData.email}
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  name="password"
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  value={userData.password}
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" class="btn btn-primary">
                Login
              </button>

              <div className="d-flex justify-content-center mt-2">
                <Link to="/signup" className={`mt-2 mb-1`}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
