import React from 'react';

import { LoadMoreBtnStyled } from './Button.styled';

const Button = ({ onClick, visible }) => {
  return (
    <LoadMoreBtnStyled type="button" onClick={onClick} hidden="hidden">
      Load more
    </LoadMoreBtnStyled>
  );
};

export default Button;
