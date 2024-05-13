import { styled, keyframes } from "styled-components";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DetailPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  max-width: 1178px;
  width: 100%;
  margin-top: 6rem;
  padding: 0 2rem;
  margin-bottom: 13rem;
  animation: ${fadeInAnimation} 0.5s ease-in-out;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

export const DetailPageHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 60vw;
    gap: 21px;
`;

export const DetailPageTitle = styled.div `
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: 100%;
    margin-top: 7vw;
`;

export const DetailPageSubTitle = styled.div `
    font-family: Pretendard-Medium;
    width: 140%;
    font-size: 13px;
    font-style: normal;

    color: #161835;
`;

export const DetailContentWrapper = styled.div`
    margin-top: 5rem;
`;

export const DetailTitle = styled.div `
    color: #161835;
    font-family: 'Pretendard-SemiBold';
    font-size: 2rem;
    font-style: normal;
    line-height: normal;
    margin-left: 1rem;
`;

export const DetailAuthor = styled.div`
    margin-left: 1rem;
    margin-top: 2rem;
    color: #AEAFB9;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 100%; /* 16px */
`;

export const DetailContent = styled.div`
    margin-left: 1rem;
    margin-top: 2rem;
    margin-bottom: 5rem;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 100%; /* 16px */
`;

export const DetailDiviner = styled.hr`
    width: 100%;
    height: 0.1rem;
    background-color: #eeeff3;
    border: none;
    margin-bottom: 2rem;
`;

export const DetailCommentHeader = styled.div`
    margin-left: 1rem;
    color: #848484;
    font-size: 1.4rem;
    font-weight: 600;
`;

export const Thumbnailimg = styled.img`
  display: flex;
  width: 1.6rem;
  height: 1.6rem;
  justify-self: center;
  align-self: flex-end;
  margin-bottom: 6rem;
`;

export const DetailViewText = styled.p`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  color: #d9d9d9;
  text-align: center;
  font-size: 16px;
`;
export const LikeViewWrapper = styled.div`
  display: flex;
  gap: 10px;
  text-align: center;
  justify-content: flex-end;

  margin-bottom: 2rem;
`;
