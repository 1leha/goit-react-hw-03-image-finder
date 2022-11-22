import React from 'react';

const ImageGalleryItem = ({ smallImageURL, fullSizedImageURL, tags }) => {
  const openModal = url => {
    console.log('url :>> ', url);
  };

  return (
    <li
      className="gallery-item"
      onClick={() => openModal(fullSizedImageURL, tags)}
    >
      <img src={smallImageURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
