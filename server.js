const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Review = require("./models/review");

const mongoURI = "mongodb://127.0.0.1:27017/reviews";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true, hidden: false });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

app.get("/api/reviews/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const reviews = await Review.find().sort({ date: -1 }).skip(skip).limit(Number(limit));
    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews / limit);

    res.status(200).json({ reviews, totalPages, totalReviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error saving review" });
  }
});

app.put("/api/reviews/:id/approve", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.approved = true;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error approving review" });
  }
});

app.put("/api/reviews/:id/hide", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.hidden = true;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error hiding review" });
  }
});

app.put("/api/reviews/:id/unhide", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.hidden = false;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error unhiding review" });
  }
});

app.put("/api/reviews/:id/helpful", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.helpfulCount += 1;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating review" });
  }
});

app.put("/api/reviews/:id/report", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.reportCount += 1;
      await review.save();
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating review" });
  }
});

app.post("/api/reviews/import", async (req, res) => {
  try {
    const { reviews } = req.body;
    await Review.insertMany(reviews);
    res.status(201).json({ message: "Reviews imported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error importing reviews" });
  }
});

app.get("/api/reviews/export", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error exporting reviews" });
  }
});

app.post("/api/reviews/bulk", async (req, res) => {
  try {
    const reviews = req.body; // Assuming the reviews are sent as an array of objects
    await Review.insertMany(reviews);
    res.status(201).json({ message: "Reviews imported successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error importing reviews", error });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
