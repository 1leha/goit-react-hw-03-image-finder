import React, { PureComponent } from 'react';

import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

import GlobalStyle from '../GlobalStyle';
import AppStyled from './App.styled';

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
