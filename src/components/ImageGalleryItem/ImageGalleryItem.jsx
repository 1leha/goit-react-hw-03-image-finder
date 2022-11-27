import Modal from '../Modal';
import React, { PureComponent } from 'react';
import {
  ImageGalleryItemStyled,
  ImageGalleryItemImageStyled,
} from './ImageGalleryItem.styled';

class ImageGalleryItem extends PureComponent {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };

  render() {
    const { openModal } = this.state;
    const { smallImageURL, fullSizedImageURL, tags } = this.props;
    return (
      <>
        <ImageGalleryItemStyled onClick={this.toggleModal}>
          <ImageGalleryItemImageStyled
            src={smallImageURL}
            alt={tags}
            loading="lasy"
          />
        </ImageGalleryItemStyled>

        {openModal && (
          <Modal>
            <img src={fullSizedImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
