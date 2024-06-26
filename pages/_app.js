// pages/_app.js
import "../styles/globals.css"; // Assuming you have a globals.css file for global styles
import "../styles/CarouselStyles.css";
import "../styles/WriteReviewWidget.css"; // Add any other global styles here

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
