import "./authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context";
import { signUpService } from "../../services";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const checkInputFields = () => {
    return (
      user.email !== "" && user.password !== "" && user.confirmPassword !== ""
    );
  };

  const checkPassword = () => {
    if (user.password !== user.confirmPassword) {
      toast.error("Password doesn't match");
    } else {
      return true;
    }
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    if (checkInputFields()) {
      if (checkPassword()) {
        try {
          const response = await signUpService(user);
          if (response.status === 201) {
            navigate("/notes");
            localStorage.setItem("token", response.data.encodedToken);
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.createdUser)
            );

            authDispatch({
              type: "SIGNUP",
              payload: {
                user: response.data.createdUser,
                token: response.data.encodedToken,
              },
            });

            toast.success("Successfuly Signed In");
          } else {
            throw new Error("Something went wrong! Please try again later");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast.error("Enter all the fields");
    }
  };


  return (
    <div className="auth-container flex-center">
      <h3 className="text-center-title">
        NotesCloud
      </h3>
      <p className="text-center">
        Create your safe and secure notes.
      </p>
      <div className="auth-main-container flex-center">
        <div className="auth-title">
          <h2 className="text-center">Sign Up</h2>
        </div>

        <div className="auth-main">
          <div className="auth-email">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="text"
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
              className="input input-password"
              value={user.password}
              onChange={changeHandler}
              required
            ></input>
          </div>
          <div className="auth-pwd">
            <label htmlFor="pwd">Confirm Password</label>
            <input
              type="password"
              className="input input-password"
              value={user.confirmPassword}
              onChange={changeHandler}
              required
            ></input>
          </div>
          <div className="btn primary-btn text-center"

          >
            <span className='btn link-btn'>Create New Account</span>
          </div>
          <Link to="/login">
            <div className="auth-secondary-btn text-center">
              Already Have an Account
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export { Signup };
