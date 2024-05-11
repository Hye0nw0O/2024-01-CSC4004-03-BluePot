import { styled } from "styled-components";

export const CommunityContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    max-width: 1178px;

    margin-bottom: 10rem;
    @media (max-width: 550px) {
        margin-top: 3rem;
    }
`;

export const CinemaServiceDetailCommentCategory2 = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 3px solid #f0f0f0;
`;

export const CreatePost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
`;
export const CommuntiyCreateHeader = styled.div`
    color: #161835;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    border: 1px solid #161835;
    padding: 1rem;
    border-radius: 16px;
    width: 10%;
`;
export const CommunityCreateTitle = styled.input`
    margin-top: 2rem;
    width: 100%;
    height: 4rem;

    border: 1px solid #d9d9df;
    border-radius: 10px;
    padding: 0 10px;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    &:focus {
        outline: none;
    }
`;

export const CommunityCreateButton = styled.button`
    width: 10rem;
    height: 4rem;
    border: none;
    border-radius: 8px;
    background-color: #161835;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #161835;
        border: 1px solid #161835;
    }
`;
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 2rem;
`;
export const SelcetorWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    gap: 2rem;
    margin-top: 2rem;
`;

export const SelcetorDescriptionText = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
`;

export const Select = styled.select`
    background-color: #161835;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 500;

    appearance: none;
    text-align: center;
    cursor: pointer;
`;

export const Option = styled.option`
    background-color: #ffffff;
    color: #333333;
`;

export const ServiceDetailCommentWrap = styled.div`
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
    margin-top: 3rem;
    border-bottom: 3px solid #f0f0f0;
`;

export const AiServiceDetailCommentReview = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 1.8rem;
    border-bottom: 3px solid #161835;
`;

export const AiServiceDetailCommentTip = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 1.8rem;
`;

export const TabMenuWrap = styled.div``;

// 탭 메뉴
export const CommunityContentCategoryTabMenu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style: none;
`;

export const CommunityContentCategoryMenuItem = styled.li`
    padding: 15px 10px;
    font-size: 2rem;
    font-weight: 600;
    cursor: pointer;
    color: ${props => (props.$isActive ? "#161835" : "black")};
    border-bottom: ${props => (props.$isActive ? "3px solid #161835" : "none")};
    margin-left: 3rem;
    margin-bottom: -0.3rem;
`;


export const CreatePageHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 60vw;
    gap: 21px;
`;

export const CreatePageTitle = styled.div `
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: 100%;
    margin-top: 7vw;
`;

export const CreatePageSubTitle = styled.div `
    font-family: Pretendard-Medium;
    width: 140%;
    font-size: 13px;
    font-style: normal;

    color: #161835;
`;
