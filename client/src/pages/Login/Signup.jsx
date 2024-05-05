import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthServices from "../../api/services/auth-services";
import { GlobalContext, actions } from "../../context";
import "./login.scss";

function Signup() {
  const navigate = useNavigate();
  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmitUserData = (event) => {
    event.preventDefault();

    // console.log(event.target['email'].value);

    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.username === ""
    ) {
      toast.error("Fill all the fields");
    } else {
      // console.log(userData);
      storeHandler(actions.SHOW_LOADER, true);
      AuthServices.register(JSON.stringify(userData))
        .then((res) => {
          storeHandler(actions.SHOW_LOADER, false);
          localStorage.setItem("email", userData.email);
          toast.success(res?.message);
          setTimeout(() => {
            navigate("/login");
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
                Signup to Register
              </h4>

              <div class="form-floating mb-3">
                <input
                  name="Username"
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Enter you name"
                  required
                  value={userData.username}
                  onChange={(event) =>
                    setUserData((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
