const summarizeReviews = (reviews) => {
  const summary = {
    appearance: { count: 0, phrases: [] },
    quality: { count: 0, phrases: [] },
    value: { count: 0, phrases: [] },
    size: { count: 0, phrases: [] },
  };

  reviews.forEach((review) => {
    const text = review.reviewText.toLowerCase();

    if (text.includes("appearance")) {
      summary.appearance.count++;
      summary.appearance.phrases.push(review.reviewText);
    }

    if (text.includes("quality")) {
      summary.quality.count++;
      summary.quality.phrases.push(review.reviewText);
    }

    if (text.includes("value")) {
      summary.value.count++;
      summary.value.phrases.push(review.reviewText);
    }

    if (text.includes("size")) {
      summary.size.count++;
      summary.size.phrases.push(review.reviewText);
    }
  });

  return summary;
};

export default summarizeReviews;
