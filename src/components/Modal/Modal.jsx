import { useEffect } from 'react';
import { Overlay, ModalViewer, ModalImg } from './Modal.styled'; // добавить CloseBtn
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, largeImageUrl, query }) => {
  useEffect(() => {
    const closeByEsc = ({ code }) => {
      if (code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeByEsc)
    return () => {
      window.removeEventListener('keydown', closeByEsc)
    }

   
  }, [closeModal]);

 

 

  const closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={closeByBackdrop}>
      <ModalViewer>
        {/* <CloseBtn type='button' onClick={()=>this.props.closeModal()}>Close</CloseBtn> */}
        <ModalImg src={largeImageUrl} alt={query} />
      </ModalViewer>
    </Overlay>
  );
};

Modal.propTypes = {
  query: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
