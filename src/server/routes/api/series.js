import express from "express";
import axios from "../../axiosServerInstance";
const router = express.Router();

router.post("/on-the-air", (req, res) => {
  axios
    .get("/tv/on_the_air", {
      params: {
        language: req.body.language || "en",
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during get-latest series")
    );
});

router.post("/top-rated", (req, res) => {
  axios
    .get("/tv/top_rated", {
      params: {
        language: req.body.language || "en",
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during top-rated series")
    );
});

router.post("/most-popular", (req, res) => {
  axios
    .get("/tv/popular", {
      params: {
        language: req.body.language || "en",
        page: req.body.page || 1
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during popular series")
    );
});

router.post("/serie/:id", (req, res) => {
  axios
    .get(`/tv/${req.params.id}`, {
      params: {
        append_to_response: "videos,credits"
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json("An error occurred during get serie"));
});

export default router;
