const User = require("../model/model.js");
const passport = require("passport");

// Controller functions for our api endpoints

// When user tries to access the dashboard page passport checks whether user is authenticated
// If user is authenticated, users saved messages and follows are sent and displayed

exports.dashboard = (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.send([
      "load page",
      req.user.message,
      req.user.username,
      req.user.favourite,
      req.user.follow,
    ]);
  } else {
    res.send(["redirect to login"]);
  }
};

// When user submits a message via their dashboard it is then saved in the database with their profile

exports.save = (req, res) => {
  const message = req.body.message;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.message = [];
        user.message = user.message.concat(message);
        user.save(() => {
          console.log("message saved");
          res.send("message saved");
        });
      }
    }
  });
};

// Lets user delete one of their own messages from their profile

exports.delete = (req, res) => {
  const message = req.body.message;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.message = [];
        user.message = user.message.concat(message);
        user.save(() => {
          console.log("message deleted");
          res.send("message deleted");
        });
      }
    }
  });
};

// Lets user delete one of their favourited messages from their profile

exports.deleteFave = (req, res) => {
  const favourite = req.body.favourites;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.favourite = [];
        user.favourite = user.favourite.concat(favourite);
        user.save(() => {
          console.log("favourite deleted");
          res.send("favourite deleted");
        });
      }
    }
  });
};

// Lets user delete a user they follow from their profile

exports.deleteFollow = (req, res) => {
  const follow = req.body.follow;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.follow = [];
        user.follow = user.follow.concat(follow);
        user.save(() => {
          console.log("follow deleted");
          res.send("follow deleted");
        });
      }
    }
  });
};

// Lets user edit their own messages

exports.edit = (req, res) => {
  const message = req.body.message;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.message = [];
        user.message = user.message.concat(message);
        user.save(() => {
          console.log("message edited");
          res.send("message edited");
        });
      }
    }
  });
};

exports.load = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        res.send(user.message);
      }
    }
  });
};

// Once a new user tries to signup via the signup page
// A new user is created in the database
// passport then authenticates them and directs them to their dashboard

exports.registerUser = (req, res) => {
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    (err, user) => {
      // Register user with passport-local-mongoose
      if (err) {
        console.log(err); // Log error
        res.send("error. redirecting to signup page"); // Redirect user to signup page
      } else {
        // Authenticate user with passport, send cookie to browser to store user ID in order for server to authenticate user
        passport.authenticate("local")(req, res, () => {
          res.send("authenticated");
          console.log("authenticated. redirecting to dashboard");
        });
      }
    }
  );
};

// When user tries to login mongoose first checks whether user exists
// Passport then authenticates them and redirects them to their dashboard

exports.loginUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Authenticate user with passport, send cookie to browser to store user ID in order for server to authenticate user
      passport.authenticate("local")(req, res, () => {
        console.log("authenticated");
        res.send(["authenticated", req.body.email]);
      });
    }
  });
};

// When user views the feed page passport checks whether they are authenticated
// If user is authenticated all users most recent messages are displayed
// Else user is redirected to login page

exports.userMessages = (req, res) => {
  if (req.isAuthenticated()) {
    User.find({ message: { $ne: [] } }, (err, users) => {
      if (err) {
        console.log(err);
      } else {
        if (users) {
          console.log(users);
          res.send(["load page", users]);
        }
      }
    });
  } else {
    res.send(["redirect to login"]);
  }
};

// If user logins with admin credentials and credentials are correct
// User is redirected to admin page where they can delete users

exports.admin = (req, res) => {
  if (req.isAuthenticated() && req.user.id === process.env.ADMIN_ID) {
    User.find({ username: { $ne: "admin" } }, (err, users) => {
      if (err) {
        console.log(err);
      } else {
        if (users) {
          console.log(users);
          res.send(["load page", users]);
        }
      }
    });
  } else {
    res.send(["redirect to login"]);
  }
};

// Allows admin to delete user accounts from the database

exports.deleteAccount = (req, res) => {
  const id = req.body.id;
  console.log(req.user);
  User.findById(id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.remove(() => {
          console.log("user deleted");
          res.send("user deleted");
        });
      }
    }
  });
};

// When user goes to the page of another user they follow
// All the messages of that user is displayed

exports.user = (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.body.id;
    User.findById(id, (err, users) => {
      if (err) {
        console.log(err);
      } else {
        if (users) {
          console.log(users);
          res.send(["load page", users.message, users.username]);
        }
      }
    });
  } else {
    res.send(["redirect to login"]);
  }
};

// Allows user to add a message to their favourites

exports.favourite = (req, res) => {
  const favourite = req.body.favourites;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.favourite = user.favourite.concat(favourite);
        user.save(() => {
          console.log("added to favourites");
          res.send("added to favourites");
        });
      }
    }
  });
};

// Allows user to follow another user and view their entire message history

exports.follow = (req, res) => {
  const follow = req.body.follow;
  console.log(req.user);
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      if (user) {
        user.follow = user.follow.concat(follow);
        user.save(() => {
          console.log("following");
          res.send("following");
        });
      }
    }
  });
};
