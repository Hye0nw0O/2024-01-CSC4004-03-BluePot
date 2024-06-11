import React, { useState } from "react";
import * as S from "./style";

function NicknameChangeModal({ currentNickname, onClose, onSave }) {
    const [newNickname, setNewNickname] = useState("");

    const handleSave = () => {
        if (newNickname.length > 0 && newNickname.length <= 10) {
            onSave(newNickname);
            onClose();
        }
    };

    const isNicknameValid = newNickname.length > 0 && newNickname.length <= 10;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.ModalContainer>
                <S.ModalHeader>닉네임 변경</S.ModalHeader>
                <S.ModalBody>
                    <S.ModalLabel>원래 닉네임</S.ModalLabel>
                    <S.CurrentNickname>{currentNickname}</S.CurrentNickname>
                    <S.ModalLabel>변경할 닉네임</S.ModalLabel>
                    <S.ModalInput 
                        type="text" 
                        value={newNickname} 
                        onChange={(e) => setNewNickname(e.target.value)}
                        maxLength="10"
                    />
                </S.ModalBody>
                <S.ModalFooter>
                    <S.ModalButton 
                        onClick={handleSave} 
                        disabled={!isNicknameValid}
                        isNicknameValid={isNicknameValid}
                    >
                        변경하기
                    </S.ModalButton>
                    <S.CancelButton onClick={onClose}>취소</S.CancelButton>
                </S.ModalFooter>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}

export default NicknameChangeModal;
