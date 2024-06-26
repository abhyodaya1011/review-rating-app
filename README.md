# review-rating-app

This is a full-stack application for managing product reviews. It features a Node.js backend and a Next.js frontend.

## Features

- Display product reviews
- Summarize reviews using AI (Hugging Face API)
- Mark reviews as helpful
- Report reviews
- Admin dashboard for managing reviews

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Axios
- **Frontend:** Next.js, React, Axios

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- MongoDB
- Hugging Face API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhyodaya1011/review-rating-app.git
   cd review-rating-app
   ```

2. **Install dependencies**


   ```
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root of the `backend` directory with the following content:

   ```
   MONGODB_URI=your_mongodb_connection_string
   HUGGING_FACE_API_KEY=your_hugging_face_api_key
   ```

4. **Run the servers**

   In the backend directory:
   ```
   node server.js
   ```

   In the frontend directory:
   ```
   npm run dev
   ```

## Usage

### Backend

The backend provides the following endpoints:

- `GET /api/reviews`: Fetch all reviews
- `PUT /api/reviews/:id/helpful`: Mark a review as helpful
- `PUT /api/reviews/:id/report`: Report a review

### Frontend

The frontend displays the reviews and provides an admin dashboard for managing reviews. It uses React for the UI components.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [Hugging Face](https://huggingface.co/)
- [MongoDB](https://www.mongodb.com/)
