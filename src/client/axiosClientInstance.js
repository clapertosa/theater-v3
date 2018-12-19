import axios from "axios";

let instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === "development" ? "" : "s"}://${
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : "theater-webapp.herokuapp.com"
  }/api`
});

export default instance;
