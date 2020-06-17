module.exports = function(sequelize, DataTypes) {
  const Menu = sequelize.define("Menu", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["entree", "appetizer", "side", "beverage", "dessert"]]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Menu.associate = function(models) {
    Menu.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Menu;
};
module.exports = function(sequelize, DataTypes) {
  const Menu = sequelize.define("Menu", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Menu.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Menu.belongsTo(models.Restaurant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Menu;
};
