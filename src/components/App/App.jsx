import React, { PureComponent } from 'react';

import GlobalStyle from '../GlobalStyle';
import Box from '../Box';
import AppStyled from './App.styled';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

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
      <>
        <GlobalStyle />
        <AppStyled>
          <Searchbar onSubmit={this.handleSerch} />
          <ImageGallery searchString={this.state.searchingThing} />
        </AppStyled>
      </>
    );
  }
}
