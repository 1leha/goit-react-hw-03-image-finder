// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Options
import {
  mashineStatus,
  GALLERY_SCROLL_TIMEOUT,
  pixabayOptions,
} from '../../services/options';

// Services
import { fetchData } from '../../services';
import { message } from '../../services/messages';

// Components
import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';
import IdleScreen from './IdleScreen';
import Loader from 'components/Loader';

// Styled Components
import { ImageGalleryStyled } from './ImageGallery.styled';

export default class ImageGallery extends PureComponent {
  static propTypes = {
    searchString: PropTypes.string,
    searchData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    query: '',
    page: 1,
    searchData: [],
    firstImgUrlInFetch: '',
    status: mashineStatus.IDLE,
    error: '',
    loadMoreBtnVisibility: false,
  };

  scrollNextPage = () => {
    //! Тут три дні мучався, зробив  скролл якось так... Не знаю вірно чи ні, але працює :)
    setTimeout(() => {
      const { firstImgUrlInFetch } = this.state;
      const url = firstImgUrlInFetch;
      const firstImg = document.querySelector(`img[src="${url}"]`);

      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: firstImg.offsetTop - 84,
      });
    }, GALLERY_SCROLL_TIMEOUT);
  };

  nextPage = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async () => {
    const { page } = this.state;

    this.setState({
      status: mashineStatus.LOADING,
    });

    try {
      const data = await fetchData(this.props.searchString, this.state.page);

      const hits = await data.hits;

      // NoImages found check
      if (!hits.length) {
        toast.info(`No images found!`);
        this.setState({
          status: mashineStatus.SUCCESSFULLY,
          loadMoreBtnVisibility: false,
        });
        return;
      }
      // Get url for the first image of new page
      const url = await hits[0].webformatURL;

      // Calculating Total images found and left images in base
      const imagesPerPage = pixabayOptions.per_page;
      const imagesInFetch = hits.length;
      const totalImages = data.totalHits;
      const pageNumber = page;

      const imagesLeft =
        imagesInFetch === imagesPerPage
          ? totalImages - imagesPerPage * pageNumber
          : 0;

      // Making a Toast :)
      toast.info(`Total found: ${data.totalHits}. Images left: ${imagesLeft}.`);

      this.setState(({ searchData }) => ({
        searchData: [...searchData, ...hits],
        firstImgUrlInFetch: url,
        status: mashineStatus.SUCCESSFULLY,
        loadMoreBtnVisibility: imagesInFetch >= imagesPerPage ? true : false,
      }));
    } catch ({ code, message }) {
      toast.error(`${code}: ${message}`);
      this.setState({
        status: mashineStatus.SUCCESSFULLY,
        error: `${code}: ${message}`,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    // Reset state when have new query and getting images
    const prevSearch = prevProps.searchString;
    const { searchString: currentSearch } = this.props;
    const { page } = this.state;

    if (prevSearch !== currentSearch) {
      this.setState({
        query: currentSearch,
        page: 1,
        searchData: [],
      });

      this.getImages();
    }

    // Check state for changing page number
    if (prevState.page !== page) {
      await this.getImages();

      // Scrolling next page func
      this.scrollNextPage();
    }
  }

  render() {
    const { status, searchData, loadMoreBtnVisibility } = this.state;
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

        {status === mashineStatus.LOADING && <Loader />}

        {/* Place for render ERROR container if it need */}
        {/* {status === mashineStatus.ERROR && <Modal>{error}</Modal>} */}

        {status === mashineStatus.SUCCESSFULLY && loadMoreBtnVisibility && (
          <Button onClick={this.nextPage} />
        )}

        <ToastContainer />
      </>
    );
  }
}
