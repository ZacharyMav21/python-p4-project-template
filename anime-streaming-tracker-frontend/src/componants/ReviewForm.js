// src/components/ReviewForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ReviewForm = ({ animeId }) => {
  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: 1,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Comment is required.'),
      rating: Yup.number().min(1).max(5).required('Rating is required.'),
    }),
    onSubmit: (values) => {
      fetch(`http://localhost:5000/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, anime_id: animeId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          name="comment"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div>{formik.errors.comment}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
        />
        {formik.touched.rating && formik.errors.rating ? (
          <div>{formik.errors.rating}</div>
        ) : null}
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
