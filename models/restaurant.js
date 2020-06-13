module.exports = function(sequelize, DataTypes) {
  const Restaurant = sequelize.define("Restaurant", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
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
      validate: {
        len: [10, 11]
      }
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
