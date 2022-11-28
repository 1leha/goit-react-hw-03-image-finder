import React, { PureComponent } from 'react';
import { MutatingDots } from 'react-loader-spinner';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//! import PropTypes from 'prop-types';

import {
  mashineStatus,
  GALLERY_SCROLL_TIMEOUT,
  pixabayOptions,
} from '../../services/options';
import { fetchData } from '../../services';
import { message } from '../../services/messages';

import Button from '../Button';
import ImageGalleryItem from '../ImageGalleryItem';
import IdleScreen from './IdleScreen';

import { ImageGalleryStyled } from './ImageGallery.styled';
import Modal from '../Modal';

export default class ImageGallery extends PureComponent {
  //! static propTypes = {second: third}

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
    // e.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getImages = async () => {
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

      const url = await hits[0].webformatURL;

      const imagesLeft =
        hits.length === pixabayOptions.per_page
          ? data.totalHits - pixabayOptions.per_page * this.state.page
          : data.totalHits;

      toast.info(`Total found: ${data.totalHits}. Images left: ${imagesLeft}.`);

      console.log('data.totalHits  :>> ', data.totalHits);
      console.log('hits.length :>> ', hits.length);
      console.log('pixabayOptions.per_page :>> ', pixabayOptions.per_page);

      this.setState(prevState => ({
        searchData: [...prevState.searchData, ...hits],
        firstImgUrlInFetch: url,
        status: mashineStatus.SUCCESSFULLY,
        loadMoreBtnVisibility:
          hits.length >= pixabayOptions.per_page ? true : false,
      }));
    } catch (error) {
      toast.error(`${error.code}: ${error.message}`);
      this.setState({
        status: mashineStatus.SUCCESSFULLY,
        error: `${error.code}: ${error.message}`,
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

        {status === mashineStatus.LOADING && (
          <div>
            <Modal>
              <MutatingDots
                height="100"
                width="100"
                color="#fff"
                secondaryColor="#fff"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </Modal>
          </div>
        )}

        {/* {status === mashineStatus.ERROR && <Modal>{error}</Modal>} */}

        {status === mashineStatus.SUCCESSFULLY && loadMoreBtnVisibility && (
          <Button onClick={this.nextPage} />
        )}

        <ToastContainer />
      </>
    );
  }
}
