import React from 'react';
import { Formik, Form, Field } from 'formik';

const Searchbar = ({ onSubmit }) => {
  const handlerSubmit = (values, { resetForm }) => {
    // console.log('values :>> ', values);
    //   console.log('props :>> ', onSubmit);

    onSubmit(values);
  };

  return (
    <header className="searchbar">
      <Formik initialValues={{ searchingThing: '' }} onSubmit={handlerSubmit}>
        {/* Parttern  "Render props" */}
        {props => {
          const searchStringIsEmpty = props.values.searchingThing === '';

          return (
            <Form className="form">
              <button
                type="submit"
                className="button"
                area-label="Search button"
                disabled={searchStringIsEmpty}
              >
                <span className="button-label">Search</span>
              </button>

              <Field
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="searchingThing"
              />
            </Form>
          );
        }}
      </Formik>
    </header>
  );
};

export default Searchbar;
