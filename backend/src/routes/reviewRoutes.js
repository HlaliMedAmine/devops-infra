const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

module.exports = (sequelize) => {
  const reviewController = require("../controllers/reviewController")(sequelize);

  router.post("/", authMiddleware, reviewController.addReview);
  router.get("/:bookId", reviewController.getReviewsForBook);

  return router;
};
