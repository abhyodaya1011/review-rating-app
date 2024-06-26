const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/reviews";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

const Review = require("./models/review");

const dropCollection = async () => {
  try {
    await Review.collection.drop();
    console.log("Collection dropped");
    process.exit(0);
  } catch (error) {
    console.error("Error dropping collection:", error);
    process.exit(1);
  }
};

dropCollection();
