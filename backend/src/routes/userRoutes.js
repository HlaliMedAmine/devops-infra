const express = require("express");
const router = express.Router();

module.exports = (sequelize) => {
  const userController = require("../controllers/userController")(sequelize);

  router.post("/register", userController.register);
  router.post("/login", userController.login);

  return router;
};
