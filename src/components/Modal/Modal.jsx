import React from 'react';
//TODO
const Modal = ({ imageUrl, tags }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={imageUrl} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
