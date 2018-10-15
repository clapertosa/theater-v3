import axios from "axios";
import keys from "./config/keys";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: keys.TMDB_API_KEY }
});

export default instance;
