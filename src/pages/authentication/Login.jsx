import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/";
import "./authentication.css";
import { loginService } from "../../services";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });

  const guestUserCredential = {
    email: "test@gmail.com",
    password: "admin",
  };

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const guestUserHandler = (e) => {
    e.preventDefault();
    setUser(guestUserCredential);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (user.email !== "" && user.password !== "") {
      try {
        const response = await loginService(user);

        if (response.status === 200) {
          localStorage.setItem("token", response.data.encodedToken);
          localStorage.setItem("user", JSON.stringify(response.data.foundUser));

          authDispatch({
            type: "LOGIN",
            payload: {
              user: response.data.foundUser,
              token: response.data.encodedToken,
            },
          });

          navigate("/notes");
        } else if (response.status === 401) {
          alert("Enter correct password");
        } else if (response.status === 404) {
          alert("Email not found");
        } else if (response.status === 500) {
          alert("Server error");
        }
        toast.success("Successfully Logged In");
      } catch (error) {
        console.log(response);
      }
    } else {
      toast.error("Enter both the fields");
    }
  };

  return (
    <div className='auth-container flex-center'>
      <h3 className="text-center-title">
        NotesCloud
      </h3>
      <p className="text-center">
        Create your safe and secure notes.
      </p>
      <div className='auth-main-container flex-center'>
        <div className="auth-title">
          <h2 className="text-center">Login</h2>
        </div>
        <div className="auth-main">
          <div className="auth-email">
            <label htmlFor="mail">E-Mail Address</label>
            <input
              type="text"
              placeholder="test@gmail.com"
              className="input input-text"
              value={user.email}
              onChange={changeHandler}
              required
            ></input>
          </div>

          <div className="auth-pwd">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              placeholder="*****"
              className="input input-password"
              value={user.password}
              onChange={changeHandler}
              required
            ></input>
          </div>

          <div className="btn primary-btn text-center"

          >
            <span className="btn link-btn" onClick={guestUserHandler}>Add Test Credential</span>
          </div>

          <div className="btn primary-btn text-center"

          >
            <span className="btn link-btn" type="submit" onClick={loginHandler}>Login </span>
          </div>

          <Link to="/signup">
            <div className="auth-secondary-btn text-center">
              Create an Account <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export { Login };
