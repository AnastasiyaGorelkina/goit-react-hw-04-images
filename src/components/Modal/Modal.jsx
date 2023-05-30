import React, { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';


export const Modal = ({largeImageURL, alt, onClose}) => {

const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  });

const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalImg>
          <img src={largeImageURL} alt={alt} />
        </ModalImg>
      </Overlay>
    );
}
