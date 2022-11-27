// import PropTypes from 'prop-types';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import React, { PureComponent } from 'react';
import { fetchData } from '../../services';

const mashineStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESSFULLY: 'successfully',
  ERROR: 'error',
};

const GALLERY_SCROLL_TIMEOUT = 500;
const galleryScrollOptions = {
  behavior: 'smooth',
  block: 'start',
  inline: 'start',
};

export default class ImageGallery extends PureComponent {
  // static propTypes = {second: third}
  state = {
    query: '',
    page: 1,
    searchData: [],
    firstImgUrlInFetch: '',
    status: mashineStatus.IDLE,
    error: '',
  };

  scrollNextPage = () => {
    setTimeout(() => {
      const url = this.state.firstImgUrlInFetch;
      const firstImg = document.querySelector(`img[src="${url}"]`);

      firstImg.scrollIntoView(galleryScrollOptions);
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
      console.log('изменилась страница ');

      this.getImages();

      // Scrolling next page func
      this.scrollNextPage();
    }
  }

  render() {
    const { status, searchData, query, error } = this.state;

    return (
      <>
        <ul className="gallery">
          {searchData.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImageURL={webformatURL}
              fullSizedImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>

        {status === mashineStatus.IDLE && (
          <div>
            Welcome to my searchin image App! Here, you can find any images you
            want... And may be, a little more... May be, you can find yourself
            here! ;)
          </div>
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
