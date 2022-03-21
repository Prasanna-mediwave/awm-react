import axios from "axios";
const http = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

export default http;

export const apiSignUp = ({ cancelToken, payload }) => {
  return http.post("/users", payload, { cancelToken });
};
