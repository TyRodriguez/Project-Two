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
