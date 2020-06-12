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
      len: [1]
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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Restaurant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Restaurant.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Restaurant.hasMany(models.Menu, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Restaurant;
};
