import React, { PureComponent } from 'react';
//! import PropTypes from 'prop-types';

import { mashineStatus, GALLERY_SCROLL_TIMEOUT } from '../../services/options';
import { fetchData } from '../../services';
import { message } from '../../services/messages';

import Box from '../Box';
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';
import IdleScreen from './IdlrScreen/';

import { ImageGalleryStyled } from './ImageGallery.styled';

export default class ImageGallery extends PureComponent {
  //! static propTypes = {second: third}

  state = {
    query: '',
    page: 1,
    searchData: [],
    firstImgUrlInFetch: '',
    status: mashineStatus.IDLE,
    error: '',
  };

  scrollNextPage = () => {
    //! Тут три дні мучався, але вийшов скролл якось так... Не знаю вірно чи ні, але працює :)
    setTimeout(() => {
      const url = this.state.firstImgUrlInFetch;
      const firstImg = document.querySelector(`img[src="${url}"]`);

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: firstImg.offsetTop - 84,
      });
    }, GALLERY_SCROLL_TIMEOUT);
  };

  nextPage = e => {
    e.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async () => {
    this.setState({
      status: mashineStatus.LOADING,
    });

    try {
      const data = await fetchData(this.props.searchString, this.state.page);
      const hits = await data.hits;
      const url = await hits[0].webformatURL;

      this.setState(prevState => ({
        searchData: [...prevState.searchData, ...hits],
        firstImgUrlInFetch: url,
        status: mashineStatus.SUCCESSFULLY,
      }));
    } catch (error) {
      this.setState({
        status: mashineStatus.ERROR,
        error: error.code,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    // Reset state when have new query and getting images
    const prevSearch = prevProps.searchString;
    const { searchString: currentSearch } = this.props;

    if (prevSearch !== currentSearch) {
      this.setState({
        query: currentSearch,
        page: 1,
        searchData: [],
      });

      this.getImages();
    }

    // Check state for changing page number
    if (prevState.page !== this.state.page) {
      await this.getImages();

      // Scrolling next page func
      this.scrollNextPage();
    }
  }

  render() {
    const { status, searchData, query, error } = this.state;

    return (
      <>
        <ImageGalleryStyled>
          {searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImageURL={webformatURL}
              fullSizedImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ImageGalleryStyled>

        {status === mashineStatus.IDLE && (
          <IdleScreen>{message.IDLE}</IdleScreen>
        )}

        {status === mashineStatus.LOADING && <div>Loading {query}...</div>}

        {status === mashineStatus.ERROR && <div>{error}</div>}

        {status === mashineStatus.SUCCESSFULLY && (
          <>
            <Button onClick={this.nextPage} />
          </>
        )}
      </>
    );
  }
}

//----------------------------------------------
// Render mashine
//----------------------------------------------

// if (status === mashineStatus.IDLE) {
//   return (
//     <div>
//       Welcome to my searchin image App! Here, you can find any images you
//       want... And may be, a little more... May be, you can find yourself
//       here! ;)
//     </div>
//   );
// }

// if (status === mashineStatus.LOADING) {
//   return <div>Loading {searchRequest}...</div>;
// }

// if (status === mashineStatus.SUCCESSFULLY) {
//   return (
//     <>
//       <ul className="gallery">
//         {searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
//           <ImageGalleryItem
//             key={id}
//             smallImageURL={webformatURL}
//             fullSizedImageURL={largeImageURL}
//             tags={tags}
//           />
//         ))}
//       </ul>
//       {/* {console.log('link to firstImgInNewFetch2 :>> ', firstImgUrlInFetch)} */}

//       <Button onClick={this.nextPage} />
//     </>
//   );
// }

// if (status === mashineStatus.ERROR) {
//   return <div>{error}</div>;
// }
