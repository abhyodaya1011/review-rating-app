import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, Rating } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const WriteReviewWidget = ({ open, handleClose }) => {
  const handleSubmitReview = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const reviewData = Object.fromEntries(formData.entries());
    // Make API call to submit the review
    // axios.post('http://localhost:5001/api/reviews', reviewData).then(handleClose).catch(console.error);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmitReview}>
        <Typography variant="h6" component="h2">
          Overall rating
        </Typography>
        <Rating name="rating" defaultValue={0} precision={1} />
        <TextField name="title" label="Review title" variant="outlined" fullWidth margin="normal" required />
        <TextField name="reviewText" label="Product review" variant="outlined" fullWidth multiline rows={4} margin="normal" required />
        <TextField name="size" label="Size" variant="outlined" fullWidth margin="normal" required />
        <TextField name="styleName" label="Style Name" variant="outlined" fullWidth margin="normal" required />
        <TextField name="color" label="Color" variant="outlined" fullWidth margin="normal" required />
        <TextField name="metalType" label="Metal Type" variant="outlined" fullWidth margin="normal" required />
        <TextField name="gemstone" label="Gemstone" variant="outlined" fullWidth margin="normal" required />
        <TextField name="images" label="Images" type="file" variant="outlined" fullWidth margin="normal" required inputProps={{ multiple: true }} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Review
        </Button>
      </Box>
    </Modal>
  );
};

export default WriteReviewWidget;
