import React from 'react';
import { Formik } from 'formik';

import {
  SearchbarStyled,
  SearchFormStyled,
  SearchFormButtonStyled,
  SearchFormButtonLabelStyled,
  SearchFormInput,
} from './Searchbar.styled';

import { BiSearch } from 'react-icons/bi';

const Searchbar = ({ onSubmit }) => {
  const handlerSubmit = (values, { resetForm }) => {
    onSubmit(values);
  };

  return (
    <SearchbarStyled>
      <Formik initialValues={{ searchingThing: '' }} onSubmit={handlerSubmit}>
        {/* Parttern  "Render props" */}
        {props => {
          const searchStringIsEmpty = props.values.searchingThing === '';

          return (
            <SearchFormStyled>
              <SearchFormButtonStyled
                type="submit"
                area-label="Search button"
                disabled={searchStringIsEmpty}
              >
                <BiSearch size={20} />
                <SearchFormButtonLabelStyled>
                  Search
                </SearchFormButtonLabelStyled>
              </SearchFormButtonStyled>

              <SearchFormInput
                className="input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name="searchingThing"
              />
            </SearchFormStyled>
          );
        }}
      </Formik>
    </SearchbarStyled>
  );
};

export default Searchbar;
