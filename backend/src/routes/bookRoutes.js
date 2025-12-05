const express = require("express");
const router = express.Router();

module.exports = (sequelize) => {
  const bookController = require("../controllers/bookController")(sequelize);

  router.get("/", bookController.getAllBooks);
  router.get("/:id", bookController.getBookById); // Ensure this route exists
  router.post("/", bookController.addBook);

  return router;
};
