import axios from "axios";

let instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
    process.env.HOST
  } || "localhost:3000"}/api`
});

export default instance;
