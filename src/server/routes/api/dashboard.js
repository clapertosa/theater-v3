import express from "express";
import knex from "../../db/knex";
import { validateMedia } from "../../shared/utilities/validator";
const router = express.Router();

router.post("/add_to_favorites", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  // Check if media exists in TMDB DB
  validateMedia(req.body).then(validation => {
    if (validation.error) {
      return res.status(400).json(validation.message);
    }
    // Check if media is already in DB
    knex("favorites")
      .first()
      .where({ user_id: userId, media_id: req.body.mediaId })
      .then(result => {
        // Check if is already in user db
        if (result) {
          return res.status(409).json("Already added in you Dashboard");
        }
        // Add media to DB
        knex("favorites")
          .insert({
            user_id: userId,
            media_id: req.body.mediaId,
            media_type: req.body.mediaType,
            media_title: req.body.mediaTitle,
            media_poster_path: req.body.mediaPosterPath
          })
          .then(response =>
            res.status(200).json("Media successfully added to favorites")
          )
          .catch(error =>
            res.status(400).json({
              message: "An error occurred during add to favorites",
              error
            })
          );
      })
      .catch(error => {
        return res.status(400).json({
          message: "An error occurred during favorites search",
          error
        });
      });
  });
});

router.post("/add_to_likes", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  // Check if media exists in TMDB DB
  validateMedia(req.body).then(validation => {
    if (validation.error) {
      return res.status(400).json(validation.message);
    }
    // Check if media is already in DB
    knex("likes")
      .first()
      .where({ user_id: userId, media_id: req.body.mediaId })
      .then(result => {
        // Check if is already in user db
        if (result) {
          return res.status(409).json("Already added in you Dashboard");
        }
        // Add media to DB
        knex("likes")
          .insert({
            user_id: userId,
            media_id: req.body.mediaId,
            media_type: req.body.mediaType,
            media_title: req.body.mediaTitle,
            media_poster_path: req.body.mediaPosterPath
          })
          .then(response =>
            res.status(200).json("Media successfully added to likes")
          )
          .catch(error =>
            res.status(400).json({
              message: "An error occurred during add to likes",
              error
            })
          );
      })
      .catch(error => {
        return res.status(400).json({
          message: "An error occurred during likes search",
          error
        });
      });
  });
});

router.delete("/remove_from_favorites", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  knex("favorites")
    .first()
    .where({
      user_id: userId,
      media_id: req.body.mediaId,
      media_type: req.body.mediaType
    })
    .then(record => {
      // Check if record is in user's DB
      if (!record) {
        return res.status(404).json("Media not found in Favorites");
      }
      knex("favorites")
        .where({
          user_id: userId,
          media_id: req.body.mediaId,
          media_type: req.body.mediaType
        })
        .del()
        .then(() =>
          res.status(200).json("Media successfully removed from Favorites")
        )
        .catch(error =>
          res.status(400).json({
            message: "An error occurred during removal from favorites",
            error
          })
        );
    })
    .catch(error =>
      res.status(400).json({
        message: "An error occurred during remove from favorites check",
        error
      })
    );
});

router.delete("/remove_from_likes", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  knex("likes")
    .first()
    .where({
      user_id: userId,
      media_id: req.body.mediaId,
      media_type: req.body.mediaType
    })
    .then(record => {
      // Check if record is in user's DB
      if (!record) {
        return res.status(404).json("Media not found in likes");
      }
      knex("likes")
        .where({
          user_id: userId,
          media_id: req.body.mediaId,
          media_type: req.body.mediaType
        })
        .del()
        .then(() =>
          res.status(200).json("Media successfully removed from likes")
        )
        .catch(error =>
          res.status(400).json({
            message: "An error occurred during removal from likes",
            error
          })
        );
    })
    .catch(error =>
      res.status(400).json({
        message: "An error occurred during remove from likes check",
        error
      })
    );
});

router.post("/is_favorited", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  knex("favorites")
    .first()
    .where({
      user_id: req.user.id,
      media_id: req.body.mediaId,
      media_type: req.body.mediaType
    })
    .then(media => {
      if (media) {
        return res.status(200).json(true);
      }
      return res.status(200).json(false);
    })
    .catch(error =>
      res.status(400).json({
        message: "An error occurred during check if media was favorited",
        error
      })
    );
});

router.post("/is_liked", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  knex("likes")
    .first()
    .where({
      user_id: req.user.id,
      media_id: req.body.mediaId,
      media_type: req.body.mediaType
    })
    .then(media => {
      if (media) {
        return res.status(200).json(true);
      }
      return res.status(200).json(false);
    })
    .catch(error =>
      res.status(400).json({
        message: "An error occurred during check if media was liked",
        error
      })
    );
});

router.post("/get_all_favorites", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  knex("favorites")
    .select(["media_id", "media_type", "media_title", "media_poster_path"])
    .where({ user_id: userId, media_type: req.body.mediaType })
    .then(favorites => res.status(200).json(favorites))
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred during get all favorites" })
    );
});

router.post("/get_all_likes", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not Authorized");
  }
  const userId = req.user.id;
  knex("likes")
    .select(["media_id", "media_type", "media_title", "media_poster_path"])
    .where({ user_id: userId, media_type: req.body.mediaType })
    .then(likes => res.status(200).json(likes))
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred during get all likes" })
    );
});

export default router;
