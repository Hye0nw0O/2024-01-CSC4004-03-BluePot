import styled from "styled-components";

export const CommunitySearchWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 3rem;
    z-index: 10;
    position: relative;
`;

export const SearchBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 0.5px solid #161835;
    opacity: 0.4;
    background: #fff;
    width: 23rem;
    flex-shrink: 0;
    cursor: pointer;
    z-index: 20;
    padding: 0.5rem;
`;

export const SearchInput = styled.input`
    flex: 1;
    color: #161835;
    font-family: 'Pretendard-Medium';
    font-size: 1.5rem;
    border: none;
    background: none;
    padding: 0.5rem;
    margin-right: 1rem;
    text-align: center; 
`;

export const SearchImage = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
`;
