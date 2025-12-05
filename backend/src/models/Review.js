const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Review", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false }, // Ensure username is always stored
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Ensure timestamps are auto-generated
  });
};
