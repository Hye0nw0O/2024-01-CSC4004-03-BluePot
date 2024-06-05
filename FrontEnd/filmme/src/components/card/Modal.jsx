import React from 'react';
import * as S from './style';

function Modal({ show, onClose, content }) {
  if (!show) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        {content}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Modal;
