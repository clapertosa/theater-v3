import express from "express";
import axios from "../../axiosServerInstance";
import { getToday, getOneMonthAgo } from "../../shared/utilities/date";
const router = express.Router();

router.post("/get-latest", (req, res) => {
  axios
    .get("/discover/movie?", {
      params: {
        language: req.body.language || "en",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        "primary_release_date.lte": getToday(),
        "primary_release_date.gte": getOneMonthAgo(),
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during get-latest movies")
    );
});

router.post("/top-rated", (req, res) => {
  axios
    .get("/discover/movie?", {
      params: {
        language: req.body.language || "en",
        sort_by: "vote_average.desc",
        include_adult: "false",
        include_video: "false",
        "vote_average.gte": "6",
        "vote_count.gte": "1500",
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during top-rated movies")
    );
});

router.post("/most-voted", (req, res) => {
  axios
    .get("/discover/movie?", {
      params: {
        language: req.body.language || "en",
        sort_by: "vote_count.desc",
        include_adult: "false",
        include_video: "false",
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during most-voted movies")
    );
});

router.post("/movie/:id", (req, res) => {
  axios
    .get(`/movie/${req.params.id}`, {
      params: {
        append_to_response: "videos,credits"
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json("An error occurred during get movie"));
});

export default router;
