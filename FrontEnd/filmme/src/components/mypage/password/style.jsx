import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    text-align: center;
`;

export const ModalHeader = styled.h2`
    margin-top: 0;
    font-size: 2rem;
    margin-bottom: 2rem;
`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;

export const ModalLabel = styled.label`
    font-weight: bold;
    font-size: 1.5rem;
`;

export const CurrentNickname = styled.div`
    padding: 0.5rem;
    font-size: 1rem;
    color: #333333;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 60%;
    text-align: center;
    margin-bottom: 1rem;
    background-color: #f0f0f0;
`;

export const ModalInput = styled.input`
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 60%;
    text-align: center;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;

export const ModalButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${props => (props.isNicknameValid || props.isPasswordValid ? '#161835' : '#ddd')};
    color: ${props => (props.isNicknameValid || props.isPasswordValid ? 'white' : '#888')};
    pointer-events: ${props => (props.isNicknameValid || props.isPasswordValid ? 'auto' : 'none')};

    &:hover {
        background-color: ${props => (props.isNicknameValid || props.isPasswordValid ? '#0056b3' : '#ddd')};
    }
`;

export const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #ccc;
    color: #000;

    &:hover {
        background-color: #bbb;
    }
`;