const analyzeReviews = (reviews) => {
  const summary = {
    appearance: { count: 0, positive: 0, negative: 0, phrases: [] },
    quality: { count: 0, positive: 0, negative: 0, phrases: [] },
    value: { count: 0, positive: 0, negative: 0, phrases: [] },
    size: { count: 0, positive: 0, negative: 0, phrases: [] },
  };

  reviews.forEach((review) => {
    const text = review.reviewText.toLowerCase();

    if (text.includes("appearance")) {
      summary.appearance.count++;
      if (review.rating >= 4) summary.appearance.positive++;
      else summary.appearance.negative++;
      summary.appearance.phrases.push(review.reviewText);
    }

    if (text.includes("quality")) {
      summary.quality.count++;
      if (review.rating >= 4) summary.quality.positive++;
      else summary.quality.negative++;
      summary.quality.phrases.push(review.reviewText);
    }

    if (text.includes("value")) {
      summary.value.count++;
      if (review.rating >= 4) summary.value.positive++;
      else summary.value.negative++;
      summary.value.phrases.push(review.reviewText);
    }

    if (text.includes("size")) {
      summary.size.count++;
      if (review.rating >= 4) summary.size.positive++;
      else summary.size.negative++;
      summary.size.phrases.push(review.reviewText);
    }
  });

  return summary;
};

export default analyzeReviews;
