import axios from "axios";

const loginService = async (user) => {
  return axios.post("/api/auth/login", user);
};

export { loginService };
