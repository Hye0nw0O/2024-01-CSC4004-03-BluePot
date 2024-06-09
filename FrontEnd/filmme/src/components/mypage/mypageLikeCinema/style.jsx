import styled from "styled-components";

export const MypageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MypageHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 60vw;
    gap: 3rem;
`;

export const MypageTitle = styled.div`
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: 100%;
    margin-top: 7vw;
`;

export const MypageSubTitle = styled.div`
    font-family: Pretendard-Medium;
    width: 140%;
    font-size: 13px;
    font-style: normal;
    color: #161835;
    display: flex;
    align-items: center;

    img {
        width: 1em;
        height: 1em;
        margin-right: 0.5rem;
    }
`;

export const TheaterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
`;

export const TheaterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`;
