module.exports = (sequelize, DataTypes) => {
  const business = sequelize.define("Business", {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  });

  //business.associate.....
  return business;
};
