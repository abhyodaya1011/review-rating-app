import { useState, useEffect } from "react";
import axios from "axios";
import CumulativeReviewWidget from "../components/CumulativeReviewWidget";
import ReviewSummaryWidget from "../components/ReviewSummaryWidget";
import ImageReviewWidget from "../components/ImageReviewWidget";
import summarizeReviews from "../helpers/summarizeReviews";
import { FaStar } from "react-icons/fa";

const Index = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [summary, setSummary] = useState({});
  const [reviewsWithImages, setReviewsWithImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reviews");
        const reviews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(reviews);
        calculateAggregateRatings(reviews);
        const reviewSummary = summarizeReviews(reviews);
        setSummary(reviewSummary);
        setReviewsWithImages(reviews.filter((review) => review.images.length > 0));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const calculateAggregateRatings = (reviews) => {
    if (reviews.length === 0) return;

    let totalRating = 0;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach((review) => {
      totalRating += review.rating;
      distribution[review.rating] += 1;
    });

    setAverageRating(totalRating / reviews.length);
    setRatingDistribution(distribution);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleHelpful = async (reviewId) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${reviewId}/helpful`);
      const response = await axios.get("http://localhost:5001/api/reviews");
      setReviews(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Error marking review as helpful:", error);
    }
  };

  const handleReport = async (reviewId) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${reviewId}/report`);
      const response = await axios.get("http://localhost:5001/api/reviews");
      setReviews(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (error) {
      console.error("Error reporting review:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2>Review this product</h2>
        <p>Share your thoughts with other customers</p>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={openModal}
        >
          Write a Review
        </button>
      </div>
      <CumulativeReviewWidget averageRating={averageRating} ratingDistribution={ratingDistribution} totalReviews={reviews.length} />
      <ReviewSummaryWidget summary={summary} />
      <ImageReviewWidget reviews={reviewsWithImages} />
      <div style={{ marginTop: "20px" }}>
        {reviews.map((review) => (
          <div key={review._id} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px", borderRadius: "5px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <img
                src={`https://via.placeholder.com/50?text=${review.name.charAt(0)}`}
                alt={review.name}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{review.name}</h4>
                <p style={{ margin: 0, color: "#555" }}>{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ color: "#FFA41C", marginRight: "5px" }}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <h4 style={{ margin: 0 }}>{review.title}</h4>
            </div>
            <p style={{ color: "#555" }}>
              Size: {review.size} | Style: {review.styleName} | Metal Type: {review.metalType} | Gemstone: {review.gemstone} | Colour: {review.color}{" "}
              | <span style={{ color: "orange" }}>Verified Purchase</span>
            </p>
            <p>{review.reviewText}</p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              {review.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt="Review Image"
                  style={{ width: "100px", height: "100px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                onClick={() => handleHelpful(review._id)}
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Helpful ({review.helpfulCount})
              </button>
              <button
                onClick={() => handleReport(review._id)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Report ({review.reportCount})
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.25)",
            zIndex: 1000,
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>Overall rating</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target);
              const reviewData = Object.fromEntries(formData.entries());
              axios.post("http://localhost:5001/api/reviews", reviewData).then(closeModal).catch(console.error);
            }}
          >
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} style={{ display: "none" }} />
                    <FaStar size={30} color={ratingValue <= rating ? "#FFA41C" : "#e4e5e9"} style={{ cursor: "pointer" }} />
                  </label>
                );
              })}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                name="title"
                placeholder="Review title"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <textarea
                name="reviewText"
                placeholder="Product review"
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box", resize: "none" }}
              ></textarea>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="file"
                name="images"
                multiple
                required
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="submit"
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Index;
