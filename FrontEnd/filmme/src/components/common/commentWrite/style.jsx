import { styled } from "styled-components";

export const DetailCommentInputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const DetailCommentInput = styled.input`
    margin-left: 1rem;
    width: 90%;
    height: 4rem;
    border: 1px solid #eeeff3;
    border-radius: 1.5rem;
    padding: 0rem 2rem;
    font-size: 1.5rem;
    font-weight: 400;
    color: #282828;
    outline: none;
    &::placeholder {
        color: #acacac;
    }
`;

export const DetailCommentButton = styled.button`
    width: 5%;
    height: 4rem;
    margin-left: 2rem;
    border: 1px solid #aeafb9;
    border-radius: 1.5rem;

    color: #acacac;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    // hover
    &:hover {
        background-color: #eeeff3;
    }
`;