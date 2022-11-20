import React, { Component } from 'react';

import { Box } from 'components/Box';
import { AppStyled } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends Component {
  state = { searchString: '' };

  handleSerch = ({ searchingThing }) => {
    console.log('searchingThing :>> ', searchingThing);
  };

  render() {
    return (
      <Box
      // height="100vh"
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      // fontSize="xxl"
      // color="primary"
      >
        <AppStyled>
          <Searchbar onSubmit={this.handleSerch} />
          <ImageGallery />
        </AppStyled>
      </Box>
    );
  }
}
