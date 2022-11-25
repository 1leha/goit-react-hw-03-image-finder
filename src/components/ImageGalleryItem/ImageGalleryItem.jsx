import Modal from 'components/Modal';
import React, { PureComponent } from 'react';

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
        <li className="gallery-item" onClick={this.toggleModal}>
          <img src={smallImageURL} alt={tags} loading="lasy" />
        </li>
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
