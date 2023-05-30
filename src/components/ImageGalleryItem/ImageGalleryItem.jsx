import React, { useState } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

    return (
      <Item>
        <Img onClick={toggleModal} src={src} alt={alt} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
        )}
      </Item>
    );
 
};



ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string,
}