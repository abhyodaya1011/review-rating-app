const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Review = require("./models/review");

const mongoURI = "mongodb://127.0.0.1:27017/reviews";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

const seedReviews = async () => {
  try {
    await Review.deleteMany({});
    const reviews = [];
    const reviewSentences = [
      "The size is perfect for my hand.",
      "I love the style of this piece.",
      "The metal quality is excellent.",
      "The gemstones sparkle brilliantly.",
      "The appearance of this jewelry is stunning.",
      "The quality of this product exceeded my expectations.",
      "Great value for the price.",
    ];

    const reviewTitles = [
      "Perfect Size",
      "Beautiful Style",
      "High Quality Metal",
      "Sparkling Gemstones",
      "Stunning Appearance",
      "Excellent Quality",
      "Great Value",
    ];

    for (let i = 0; i < 100; i++) {
      const title = faker.helpers.arrayElement(reviewTitles);
      const reviewText = faker.helpers.arrayElement(reviewSentences) + " " + faker.lorem.sentences(2);

      reviews.push({
        productId: faker.string.uuid(), // Use the correct method for UUID
        name: faker.person.fullName(), // Use the correct method for person name
        title: title,
        rating: faker.number.int({ min: 1, max: 5 }),
        reviewText: reviewText,
        date: faker.date.past(),
        images: [
          faker.image.urlLoremFlickr({ category: "jewelry" }),
          faker.image.urlLoremFlickr({ category: "jewelry" }),
          faker.image.urlLoremFlickr({ category: "jewelry" }),
        ],
        approved: true, // Automatically approve for testing
        hidden: false,
        helpfulCount: faker.number.int({ min: 0, max: 100 }),
        reportCount: faker.number.int({ min: 0, max: 10 }),
        size: faker.helpers.arrayElement(["4", "5", "6", "7", "8", "9"]),
        styleName: faker.helpers.arrayElement(["Modern", "Classic", "Vintage", "Art Deco", "Minimalist"]),
        color: faker.color.human(),
        metalType: faker.helpers.arrayElement(["Gold", "Silver", "Platinum", "Palladium"]),
        gemstone: faker.helpers.arrayElement(["Diamond", "Ruby", "Sapphire", "Emerald", "Amethyst"]),
      });
    }

    await Review.insertMany(reviews);
    console.log("Database seeded with 100 jewelry reviews");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedReviews();
