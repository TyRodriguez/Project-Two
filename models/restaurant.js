module.exports = function(sequelize, DataTypes) {
  const Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hours: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Restaurant.associate = function(models) {
    Restaurant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Restaurant.hasMany(models.Menu, {
      onDelete: "cascade"
    });
  };
  return Restaurant;
};
