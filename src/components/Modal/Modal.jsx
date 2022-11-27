import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <OverlayStyled onClick={this.closeModal}>
        <ModalStyled>{children}</ModalStyled>
      </OverlayStyled>,
      modalRoot
    );
  }
}

export default Modal;
