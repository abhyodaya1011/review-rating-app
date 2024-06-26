import axios from "axios";

export const summarizeWithHuggingFace = async (text) => {
  const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"; // Replace with your Hugging Face model API URL
  const API_KEY = "your-hugging-face-api-key"; // Replace with your Hugging Face API key

  try {
    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    return response.data[0]?.summary_text || "No summary available.";
  } catch (error) {
    console.error("Error fetching summary from Hugging Face API:", error.response ? error.response.data : error.message);
    return "No summary available.";
  }
};
