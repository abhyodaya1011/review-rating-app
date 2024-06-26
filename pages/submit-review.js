import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SubmitReview = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [name, setName] = useState("");
  const [title, setTitle] = useState(""); // Add title state
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]);
  const [size, setSize] = useState(""); // Add size state
  const [styleName, setStyleName] = useState(""); // Add styleName state
  const [color, setColor] = useState(""); // Add color state
  const [metalType, setMetalType] = useState(""); // Add metalType state
  const [gemstone, setGemstone] = useState(""); // Add gemstone state

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("title", title); // Append title
    formData.append("rating", rating);
    formData.append("reviewText", reviewText);
    formData.append("size", size); // Append size
    formData.append("styleName", styleName); // Append styleName
    formData.append("color", color); // Append color
    formData.append("metalType", metalType); // Append metalType
    formData.append("gemstone", gemstone); // Append gemstone
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post("http://localhost:5001/api/reviews", formData);
      alert("Review submitted for moderation");
      router.push(`/product/${productId}`); // Redirect back to the product page after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)} required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label>Review</label>
        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Size</label>
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
      </div>
      <div>
        <label>Style Name</label>
        <input type="text" value={styleName} onChange={(e) => setStyleName(e.target.value)} required />
      </div>
      <div>
        <label>Color</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      <div>
        <label>Metal Type</label>
        <input type="text" value={metalType} onChange={(e) => setMetalType(e.target.value)} required />
      </div>
      <div>
        <label>Gemstone</label>
        <input type="text" value={gemstone} onChange={(e) => setGemstone(e.target.value)} required />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={handleImageChange} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default SubmitReview;
