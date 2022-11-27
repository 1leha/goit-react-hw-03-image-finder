import React from 'react';

import { LoadMoreBtnStyled } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <LoadMoreBtnStyled type="button" onClick={onClick}>
      Load more
    </LoadMoreBtnStyled>
  );
};

export default Button;
