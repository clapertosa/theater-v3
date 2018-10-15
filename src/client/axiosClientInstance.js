import axios from "axios";

const instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === "production" ? "s" : ""}://${process
    .env.host || "localhost:3000"}/api`
});

export default instance;
