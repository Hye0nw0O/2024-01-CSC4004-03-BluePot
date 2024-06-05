import styled from "styled-components";

export const CommunitySearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin-top: 3rem;
    z-index: 10;
    position: relative;
`;

export const SearchBox = styled.div`
    border-radius: 15px;
    border: 0.5px solid #161835;
    opacity: 0.4;
    background: url('/path/to/search-icon.png') no-repeat center center;
    width: 25rem;
    flex-shrink: 0;
    cursor: pointer;
    z-index: 20;
`;

export const SearchInput = styled.div`
    display: flex;
    align-items: center;
    color: #161835;
    text-align: center;
    font-family: 'Pretendard-Medium';
    font-size: 1.5rem;
    margin-right: 7rem;
    margin-bottom: 1rem;
    z-index: 20;
`;

export const SearchImage = styled.img`
    margin-right: 3rem;
    width: 1.5rem;
    height: 1.5rem;
`;