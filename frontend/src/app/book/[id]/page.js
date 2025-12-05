"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchBookDetails, fetchReviews, submitReview } from "../../../services/api";
import { useUser } from "../../../context/UserContext";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails(id).then(setBook).catch(err => console.error(err));
    fetchReviews(id).then(setReviews).catch(err => console.error(err));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to post a review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await submitReview({ bookId: id, comment: newReview, rating }, token);
      setReviews([response.review, ...reviews]);
      setNewReview("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit review.");
    }
  };

  if (!book) return <p className="text-center">Loading book details...</p>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm mt-2">⭐ {book.rating}/5</p>

      <h2 className="text-2xl mt-6">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="mt-2">
          {reviews.map((review, index) => (
            <li key={index} className="border p-2 my-2 rounded">
              <p className="font-bold">{review.username}</p>
              <p>{review.comment}</p>
              <p className="text-sm">⭐ {review.rating}/5</p>
            </li>
          ))}
        </ul>
      )}

      {user && (
        <form onSubmit={handleReviewSubmit} className="mt-4 p-4 border rounded">
          <h3 className="text-xl">Add a Review</h3>
          {error && <p className="text-red-500">{error}</p>}
          <textarea
            className="w-full p-2 border rounded mt-2"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            required
          />
          <select 
            className="w-full p-2 border rounded mt-2"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>
          <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
}
