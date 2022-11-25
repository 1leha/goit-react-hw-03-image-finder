import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

//TODO
const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  render() {
    const { children } = this.props;

    console.log('modalRoot :>> ', modalRoot);

    return createPortal(
      <div className="overlay">
        <div className="modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
