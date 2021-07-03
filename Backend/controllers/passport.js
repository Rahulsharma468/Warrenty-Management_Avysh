const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const admin = require('../models/admin');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match user
      admin.findOne({ email: email })
        .then((data) => {
          if (!data) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }

          // Match password
          bcrypt.compare(password, data.password, (err, isMatch) => {
            if (err) console.log(err);
            if (isMatch) {
              return done(null, data);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser((id, done) => {
    admin.findById(id, (err, admin) => {
      done(err, admin);
    });
  });
};
