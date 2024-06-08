import React from 'react';
import * as S from './style';

function Modal({ show, onClose, content, imageUrl, imageAlt }) {
  if (!show) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.ModalImageWrapper>
          <S.ModalImage src={imageUrl} alt={imageAlt} />
        </S.ModalImageWrapper>
        <S.ModalBody>
          {content}
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Modal;