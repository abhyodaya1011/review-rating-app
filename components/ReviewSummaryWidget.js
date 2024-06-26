import React, { useState } from "react";

const ReviewSummaryWidget = ({ summary }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleChipClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const categorySummary = {
    appearance: "Customers are satisfied with the appearance of the product. For example, they mention it's beautiful, nice, and has a good design.",
    quality: "Customers are pleased with the quality of the product. They often describe it as sturdy, durable, and well-made.",
    value: "Many customers find good value in this product. They mention it is worth the price and a good deal.",
    size: "Some customers have complaints about the size, noting it might be larger or smaller than expected.",
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", marginTop: "20px" }}>
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Customers say</h3>
      <p>Customers like the appearance, quality, and value of the product. Some complain about the size.</p>
      {/* <p style={{ fontStyle: "italic", color: "#555" }}>AI-generated from the text of customer reviews</p> */}
      <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Object.keys(summary).map((category) => (
          <div
            key={category}
            style={{
              padding: "10px 15px",
              borderRadius: "20px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
              border: expandedCategory === category ? "2px solid #4CAF50" : "2px solid transparent",
            }}
            onClick={() => handleChipClick(category)}
          >
            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#4CAF50" }}>{summary[category].count}</span>
          </div>
        ))}
      </div>
      {expandedCategory && (
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", textTransform: "capitalize" }}>{expandedCategory}</h4>
          <p>{categorySummary[expandedCategory]}</p>
          {summary[expandedCategory].phrases.slice(0, 3).map((phrase, index) => (
            <p key={index} style={{ marginBottom: "5px" }}>
              "{phrase}" <a href="#">Read more</a>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSummaryWidget;
