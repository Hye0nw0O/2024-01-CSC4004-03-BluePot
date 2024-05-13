import styled from "styled-components";

export const CommunitySearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    margin-top: 3rem;
`;

export const SearchBox = styled.div`
    border-radius: 15px;
    border: 0.5px solid #161835;
    opacity: 0.4;
    background: #FFF;
    width: 30rem;
    flex-shrink: 0;
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
`;

export const SearchImage = styled.img`
    margin-right: 5rem;
    width: 1.5rem;
    height: 1.5rem;
`;
