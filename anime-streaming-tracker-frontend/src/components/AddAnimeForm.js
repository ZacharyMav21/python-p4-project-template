import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddAnimeForm() {
  const formik = useFormik({
    initialValues: {
      title: '',
      genre: '',
      description: '',
      imageUrl: '', 
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required'),
      genre: Yup.string()
        .required('Genre is required'),
      description: Yup.string()
        .required('Description is required'),
      imageUrl: Yup.string()
        .url('Must be a valid URL')
        .required('Image URL is required'), // Validation for image URL
    }),
    onSubmit: (values) => {
      fetch('/anime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        console.log('Success:', data);
        formik.resetForm(); // Reset the form after submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.genre}
        />
        {formik.touched.genre && formik.errors.genre ? (
          <div>{formik.errors.genre}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageUrl}
        />
        {formik.touched.imageUrl && formik.errors.imageUrl ? (
          <div>{formik.errors.imageUrl}</div>
        ) : null}
      </div>

      <button type="submit">Add Anime</button>
    </form>
  );
}

export default AddAnimeForm;