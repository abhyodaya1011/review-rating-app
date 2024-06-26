import React from "react";

const CumulativeReviewWidget = ({ averageRating, ratingDistribution, totalReviews }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", marginTop: "20px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Customer reviews</h3>
      <div style={{ fontSize: "48px", fontWeight: "bold", color: "#FFA41C" }}>
        {averageRating.toFixed(1)} <span style={{ fontSize: "24px", color: "#555" }}>out of 5</span>
      </div>
      <div style={{ fontSize: "14px", color: "#555" }}>{totalReviews} global ratings</div>
      <div style={{ marginTop: "10px" }}>
        {Object.keys(ratingDistribution).map((rating) => (
          <div key={rating} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: "50px" }}>{rating} star</span>
            <div style={{ flex: 1, marginLeft: "10px", marginRight: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px", overflow: "hidden" }}>
              <div style={{ width: `${(ratingDistribution[rating] / totalReviews) * 100}%`, backgroundColor: "#FFA41C", height: "8px" }}></div>
            </div>
            <span>{((ratingDistribution[rating] / totalReviews) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CumulativeReviewWidget;
