import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddAnimeForm() {
  const initialValues = {
    title: '',
    genre: '',
    studio_id: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    genre: Yup.string().required('Required'),
    studio_id: Yup.number().required('Required').positive().integer(),
  });

  const handleSubmit = (values) => {
    fetch('/anime', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h1>Add Anime</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label htmlFor="genre">Genre</label>
            <Field name="genre" type="text" />
            <ErrorMessage name="genre" component="div" />
          </div>

          <div>
            <label htmlFor="studio_id">Studio ID</label>
            <Field name="studio_id" type="number" />
            <ErrorMessage name="studio_id" component="div" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddAnimeForm;
