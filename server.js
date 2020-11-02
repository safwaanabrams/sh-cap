
// Hide sensitive data in .env file

require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Enable using Google passport Strategy

const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Enable using Facebook passport strategy

const FacebookStrategy = require("passport-facebook").Strategy;

// Express setup

const app = express();
app.use(helmet());

// Body Parser setup

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session setup

app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup for Express

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Tell passport to manage sessions

// Establish database connection

mongoose.connect(
  process.env.MONGO_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Cannot connect to database");
    } else {
      console.log("Connected to database");
    }
  }
);

mongoose.set("useCreateIndex", true); // Removes depracation warning when running server

// Require user schema from model folder

const User = require("./model/model.js");

// Local passport strategy

passport.use(User.createStrategy()); // Create strategy for user

// Cookie management

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Our Google passport strategy

passport.use(
  new GoogleStrategy(
    {
      // Tell passport to create new Google strategy
      clientID: process.env.GOOGLE_CLIENT_ID, // Get our client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Get our client secret
      callbackURL: "http://localhost:3001/auth/google/dashboard", // Reference our callback URL
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      User.findOrCreate(
        { username: profile.displayName, googleId: profile.id },
        (err, user) => {
          return cb(err, user);
        }
      );
    }
  )
);

// Our Facebook passport strategy

passport.use(
  new FacebookStrategy(
    {
      // Tell passport to create new Google strategy
      clientID: process.env.FACEBOOK_APP_ID, // Get our client ID
      clientSecret: process.env.FACEBOOK_APP_SECRET, // Get our client secret
      callbackURL: "http://localhost:3001/auth/facebook/dashboard", // Reference our callback URL
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      User.findOrCreate(
        { username: profile.displayName, facebookId: profile.id },
        (err, user) => {
          return cb(err, user);
        }
      );
    }
  )
);

// Require our api endpoints

require("./routes/routes.js")(app);

// Port

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server listening on port 3001.");
});
