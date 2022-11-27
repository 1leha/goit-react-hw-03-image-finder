import React, { PureComponent } from 'react';

import Box from 'components/Box';
import AppStyled from './App.styled';
import GlobalStyle from '../GlobalStyle';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

export class App extends PureComponent {
  state = {
    searchingThing: '',
    modalIsOpen: false,
  };

  handleSerch = ({ searchingThing }) => {
    this.setState({ searchingThing });
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
        <GlobalStyle />
        <AppStyled>
          <Searchbar onSubmit={this.handleSerch} />
          <ImageGallery searchString={this.state.searchingThing} />
        </AppStyled>
      </Box>
    );
  }
}
