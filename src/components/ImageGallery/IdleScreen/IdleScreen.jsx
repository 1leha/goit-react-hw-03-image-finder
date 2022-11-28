import React from 'react';
import PropTypes from 'prop-types';

import Box from '../../Box';

const IdleScreen = ({ children }) => {
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="fixed"
      color="lightgray"
      fontSize="l"
    >
      <div>
        <h1>Pixabay searching App</h1>
        <ul>
          <li>
            1. Прошу уважно подивитисяь на реалізацію методу скролу
            (ImageGallery.jsx). Три дні не виходило, а коли вийшло - то чую що
            то якась діч :).
          </li>
          <li>
            2. Трохи юзер експірієнсу добавив за допомогою Тостіфая. Робить
            підрахунки та еррори.
          </li>
          <li>
            3. Лінка на іконку лінзи не працює - треба підправити в ТЗ. Замінив
            на реактовську
          </li>
        </ul>
      </div>
    </Box>
  );
};

export default IdleScreen;

IdleScreen.propTypes = { children: PropTypes.node };
