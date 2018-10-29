import express from "express";
import knex from "../../db/knex";
import bcrypt from "bcryptjs";
import passport from "../../config/passport";
import { validateRegistration } from "../../shared/utilities/validator";
const router = express.Router();

router.post("/register", (req, res) => {
  const validation = validateRegistration(req.body);
  console.log(req.body);
  if (validation.error) return res.status(400).json(validation.message);

  knex("users")
    .first("*")
    .where("email", req.body.email)
    .then(user => {
      if (user) return res.status(409).json("Email already used");
      // ASYNC BCRYPT PASSWORD HASHING
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
          return res.status(400).json({
            message: "An error occurred during password hashing",
            error
          });
        }
        knex("users")
          .insert({
            name: req.body.name || "",
            surname: req.body.surname || "",
            email: req.body.email.trim(),
            password: hash,
            created_at: knex.fn.now()
          })
          .then(() =>
            res
              .status(200)
              .json(
                `You have been registered! An email has been sent to ${req.body.email.trim()}`
              )
          )
          .catch(error =>
            res.status(400).json({
              message: "An error occurred during registration",
              error
            })
          );
      });
    })
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred during registration check", error })
    );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.status(200).json({ message: "Successful login" });
});

router.post("/logout", (req, res) => {
  req.session.destroy(err => (err ? console.log(err) : null));
  req.logout();
  res.redirect("/");
});

router.post("/current_user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("Not logged in");
  }
  return res.status(200).json({
    name: req.user.name,
    surname: req.user.surname,
    email: req.user.email
  });
});

export default router;
