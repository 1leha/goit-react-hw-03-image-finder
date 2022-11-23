import React from 'react';
import { createPortal } from 'react-dom';
//TODO
const Modal = ({ imageUrl, tags }) => {
  const modalRoot = document.getElementById('modal-root');

  return createPortal(
    <div className="overlay">
      <div className="modal">
        <img src={imageUrl} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
