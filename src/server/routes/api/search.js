import express from "express";
import axios from "../../axiosServerInstance";
const router = express.Router();

router.post("/", (req, res) => {
  axios
    .get("/search/multi", {
      params: {
        query: req.body.query
      }
    })
    .then(response => res.status(200).json(response.data))
    .catch(error =>
      res.status(400).json("An error occurred during multi search")
    );
});

export default router;
