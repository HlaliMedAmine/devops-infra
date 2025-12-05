const ReviewModel = require("../models/Review");
const BookModel = require("../models/Book");
const UserModel = require("../models/User");

module.exports = (sequelize) => {
  const Review = ReviewModel(sequelize);
  const Book = BookModel(sequelize);
  const User = UserModel(sequelize);

  return {
    addReview: async (req, res) => {
      try {
        const { bookId, comment, rating } = req.body;
        const userId = req.user.userId; // Extract userId from JWT token

        // Get the username from the User model
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

        // Check if the book exists
        const book = await Book.findByPk(bookId);
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }

        // Create a new review with username and timestamp
        const newReview = await Review.create({
          userId,
          bookId,
          comment,
          rating,
          username: user.name, // Store username
        });

        res.status(201).json({ message: "Review added successfully", review: newReview });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    },

    getReviewsForBook: async (req, res) => {
      try {
        const { bookId } = req.params;

        // Fetch reviews for the book, including usernames
        const reviews = await Review.findAll({
          where: { bookId },
          order: [["createdAt", "DESC"]], // Show latest reviews first
        });

        res.json(reviews);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    },
  };
};
