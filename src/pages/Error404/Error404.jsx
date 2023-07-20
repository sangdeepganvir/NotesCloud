import { Navigate, useNavigate } from "react-router-dom";
import "./error.css";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container flex-center">
      <h1>404. Page not found!</h1>
      <button className="btn link-btn go-back-btn" onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export { Error404 };
