import React, { useState } from "react";
import * as S from "./style";

function PasswordChangeModal({ onClose, onSave }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = () => {
        if (isPasswordValid && newPassword === confirmPassword) {
            onSave(currentPassword, newPassword);
            onClose();
        }
    };

    const isPasswordValid = newPassword.length >= 8 && /[a-z]/.test(newPassword) && /[!@#$%^&*]/.test(newPassword);

    return (
        <S.ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
            <S.ModalContainer>
                <S.ModalHeader>비밀번호 변경</S.ModalHeader>
                <S.ModalBody>
                    <S.ModalLabel>기존 비밀번호</S.ModalLabel>
                    <S.ModalInput 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                    />
                    <S.ModalLabel>새 비밀번호</S.ModalLabel>
                    <S.ModalInput 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <S.ModalLabel>비밀번호 확인</S.ModalLabel>
                    <S.ModalInput 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </S.ModalBody>
                <S.ModalFooter>
                    <S.ModalButton 
                        onClick={handleSave} 
                        disabled={!isPasswordValid || newPassword !== confirmPassword}
                        isPasswordValid={isPasswordValid && newPassword === confirmPassword}
                    >
                        변경하기
                    </S.ModalButton>
                    <S.CancelButton onClick={onClose}>취소</S.CancelButton>
                </S.ModalFooter>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
}

export default PasswordChangeModal;
