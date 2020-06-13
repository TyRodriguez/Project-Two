// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // get route for restaurants
  app.get("/api/restaurant/:name", (req, res) => {
    db.Restaurant.findOne({
      where: {
        name: req.params.name
      }
    }).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });

  app.get("/api/restaurants/recent", (req, res) => {
    db.Restaurant.findAll().then(dbRestaurant => {
      res.json(dbRestaurant.slice(-1));
    });
  });

  // get route for the menu
  app.get("/api/menu", (req, res) => {
    const query = {};
    if (req.query.restaurant_id) {
      query.RestaurantId = req.query.restaurant_id;
    }
    db.Menu.findAll({
      where: query,
      include: [db.Restaurant]
    }).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  // post route for new restaurant
  app.post("/api/restaurants", (req, res) => {
    db.Restaurant.create(req.body).then(dbRestaurant => {
      res.json(dbRestaurant);
    });
  });

  // post route for new menu items
  app.post("/api/menu", (req, res) => {
    db.Menu.create(req.body).then(dbMenu => {
      res.json(dbMenu);
    });
  });

  //put route for updating restaurant info
  // app.put("/api/restaurants", (req, res) => {
  //   console.log(req.body);
  // });
};
