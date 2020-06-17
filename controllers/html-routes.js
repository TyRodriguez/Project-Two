<<<<<<< HEAD
// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
module.exports = function(app) {
  app.get("/", (req, res) => {
    // landing page
    res.render("index");
  });

  // login page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/menu");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // How can we see how members is rendered? How can we test Passport Login?
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });

  //this page is for adding menu items for members
  app.get("/menu/:rId", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    db.Restaurant.findOne({ where: { id: req.params.rId }, include: db.Menu })
      .then(data => res.json(data.dataValues))
      .catch(err => console.log(err));
  });

  // // this page will be for all viewers to see the menu
  // app.get("/menu", (req, res) => {
  //   // send front end menu
  //   res.render("");
  // });
};
=======
// Requiring path to so we can use relative routes to our HTML files

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
module.exports = function(app) {
  app.get("/", (req, res) => {
    // landing page
    res.render("index");
  });

  // login page
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // How can we see how members is rendered? How can we test Passport Login?
  app.get("/members", isAuthenticated, (req, res) => {
    res.render("members");
  });

  //this page is for adding menu items for members
  app.get("/menu/:rId", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    db.Restaurant.findOne({ where: { id: req.params.rId }, include: db.Menu })
      .then(data => res.json(data.dataValues))
      .catch(err => console.log(err));
  });

  // // this page will be for all viewers to see the menu
  // app.get("/menu", (req, res) => {
  //   // send front end menu
  //   res.render("");
  // });
};
>>>>>>> 237f47c08a41c602e9ac757a163177b93ba5fcdc
