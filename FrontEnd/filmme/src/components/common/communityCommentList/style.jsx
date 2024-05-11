import { styled } from "styled-components";

export const CommunityCommentListWrap = styled.div`
    display: flex;
    flex-direction: column;

    border-top: 2px solid #f0f0f0;
    display: flex;
    margin-top: 1.6rem;
    width: 100%;
`;

export const CommunityCommentListUl = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
`;


export const CommunityCommentListPagingWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
`;

export const CommunityCommentListPaging = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 0;
    transform: translate(-50%, 0);
`;