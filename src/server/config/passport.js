import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import knex from "../db/knex";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  knex("users")
    .first()
    .where({ id })
    .then(user => done(false, user));
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    knex("users")
      .first()
      .where({ email })
      .then(user => {
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
            return done(error, null);
          }
          if (!isMatch) {
            return done(null, false);
          }
          return done(false, user);
        });
      })
      .catch(error => done(error, false));
  })
);

export default passport;
