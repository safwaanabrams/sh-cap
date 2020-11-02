const controller = require("../controller/controller.js");
const passport = require("passport");

const CLIENT_LOGIN = "http://localhost:3000/login";
const CLIENT_LIST = "http://localhost:3000/dashboard";

// All our api endpoints with their required controller functions
// See Controller file for breakdown of functionality

module.exports = (app) => {
  app.get("/api/dashboard", controller.dashboard);

  app.post("/api/save", controller.save);

  app.post("/api/delete", controller.delete);

  app.post("/api/deletefave", controller.deleteFave);

  app.post("/api/deletefollow", controller.deleteFollow);

  app.post("/api/edit", controller.edit);

  app.get("/api/load", controller.load);

  app.post("/api/register", controller.registerUser);

  app.post("/api/login", controller.loginUser);

  app.get("/api/usermessages", controller.userMessages);

  app.get("/api/admin", controller.admin);

  app.post("/api/deleteaccount", controller.deleteAccount);

  app.post("/api/user", controller.user);

  app.post("/api/favourite", controller.favourite);

  app.post("/api/follow", controller.follow);

  // Google passport authentication

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  app.get(
    "/auth/google/dashboard",
    passport.authenticate("google", { failureRedirect: CLIENT_LOGIN }),
    (req, res) => {
      res.redirect(CLIENT_LIST);
    }
  );

  // Facebook passport authentication

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get(
    "/auth/facebook/dashboard",
    passport.authenticate("facebook", { failureRedirect: CLIENT_LOGIN }),
    (req, res) => {
      res.redirect(CLIENT_LIST);
    }
  );
};
