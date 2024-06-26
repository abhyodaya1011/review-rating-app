import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Admin.module.css";
import * as XLSX from "xlsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastProvider, useToasts } from "react-toast-notifications";

const Admin = () => {
  const [reviews, setReviews] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reviews");
        const sortedReviews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const approveReview = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${id}/approve`);
      setReviews(reviews.map((review) => (review._id === id ? { ...review, approved: true } : review)));
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const hideReview = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${id}/hide`);
      setReviews(reviews.map((review) => (review._id === id ? { ...review, hidden: true } : review)));
    } catch (error) {
      console.error("Error hiding review:", error);
    }
  };

  const unhideReview = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/reviews/${id}/unhide`);
      setReviews(reviews.map((review) => (review._id === id ? { ...review, hidden: false } : review)));
    } catch (error) {
      console.error("Error unhiding review:", error);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(reviews);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reviews");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reviews.xlsx";
    a.click();
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      try {
        await axios.post("http://localhost:5001/api/reviews/bulk", json);
        addToast("Reviews imported successfully!", { appearance: "success" });
        const response = await axios.get("http://localhost:5001/api/reviews/all");
        const sortedReviews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error importing reviews:", error);
        addToast("Error importing reviews.", { appearance: "error" });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Reviews Dashboard</h1>
      <div className={styles.header}>
        <span className={styles.headerText}>All Reviews ({reviews.length})</span>
        <div>
          <button className={styles.headerButton} onClick={handleExport}>
            Export
          </button>
          <input type="file" accept=".xlsx, .xls" onChange={handleImport} style={{ display: "none" }} id="import-input" />
          <label htmlFor="import-input" className={styles.headerButton}>
            Import
          </label>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product ID/SKU</th>
            <th>Created</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>
                <strong>{review.name}</strong>
              </td>
              <td>{review.productId}</td>
              <td>{new Date(review.date).toLocaleDateString()}</td>
              <td>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </td>
              <td>{review.reviewText}</td>
              <td>
                <span className={review.approved ? styles.published : styles.pending}>
                  {review.approved ? "Published" : "Pending"} {review.hidden ? <FaEyeSlash /> : <FaEye />}
                </span>
              </td>
              <td>
                {!review.approved && (
                  <button className={styles.approveButton} onClick={() => approveReview(review._id)}>
                    Approve
                  </button>
                )}
                {review.hidden ? (
                  <button className={styles.unhideButton} onClick={() => unhideReview(review._id)}>
                    Unhide
                  </button>
                ) : (
                  <button className={styles.hideButton} onClick={() => hideReview(review._id)}>
                    Hide
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default () => (
  <ToastProvider>
    <Admin />
  </ToastProvider>
);
