import styled from "styled-components";

export const CommunityWrapper = styled.div`
    display: flex;
    margin-right: 60vw;
    flex-direction: column;
`;

export const CommunityHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 21px;
`;

export const CommunityTitle = styled.div `
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: 100%;
    margin-top: 7vw;
`;

export const CommunitySubTitle = styled.div `
    font-family: Pretendard-Medium;
    width: 140%;
    font-size: 13px;
    font-style: normal;

    color: #161835;
`;


// 탭

export const CommunityContentWrapper = styled.div`
    width: 100%;
    max-width: 1178px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin-top: 5.7rem;
    margin-bottom: 10rem;
    background-color: white;
    @media (max-width: 550px) {
        margin-top: 3rem;
    }
`;

export const CommunityContentCategory = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 3px solid #f0f0f0;
`;

export const CommunityContentReview = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 1.8rem;
    border-bottom: 3px solid #161835;
`;

export const CommunityContentTip = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 1.8rem;
`;

export const CommunityContentCategoryTabMenu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style: none;
`;

export const CommunityContentCategoryMenuItem = styled.li`
    font-family: Pretendard-Medium;
    padding: 15px 10px;
    font-size: 1.75rem;
    font-weight: 600;
    cursor: pointer;
    color: ${props => (props.$isActive ? "#161835" : "black")};
    border-bottom: ${props => (props.$isActive ? "3px solid #161835" : "none")};
    margin-left: 3rem;
    margin-bottom: -0.3rem;
`;