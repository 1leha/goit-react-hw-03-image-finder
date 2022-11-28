import Box from '../../Box';
import React from 'react';

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
      {children}
    </Box>
  );
};

export default IdleScreen;
