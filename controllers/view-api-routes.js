// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // get route for restaurants
  app.get("/api/view-restaurants", (req, res) => {
    // console.log(req.query);
    // const query = {};
    // if (req.query.user_id) {
    //   query.UserId = req.query.user_id;
    // }
    db.Restaurant.findAll().then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });

  app.get("/api/view-menu/:id", (req, res) => {
    db.Restaurant.findOne({
      include: db.Menu,
      where: { id: req.params.id }
    }).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });
};
