import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: var(--white, #FFF);
`;

export const ContainerTop = styled.div`
  display: flex;
  padding: 120px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  background: linear-gradient(0deg, rgb(255 235 226 / 90%) 0%, rgb(188 203 255 / 90%) 100%), url(/About/aboutpicture.JPG), lightgray 50% / cover no-repeat;
  background-blend-mode: multiply, normal;
  background-size: cover;
  background-position: center;
`;

export const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

export const IntroduceFilmme = styled.div`
  color: var(--white, #FFF);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: "Gmarket Sans TTF";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 200% */
  text-transform: uppercase;
`;

export const IntroduceSloganKr = styled.div`
  color: var(--white, #FFF);

  /* Heading2 pretendard-bold 32px */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 112.5% */
`;

export const IntroduceSloganKrBlue = styled.div`
  color: var(--main2, #6069E4);
  /* Heading2 pretendard-bold 32px */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
`;

export const IntroduceTextFirst = styled.div`
  color: var(--white, #FFF);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  display: flex;

  /* Body1 Pretendard-medium 16px */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

export const line = styled.div`
  width: 264px;
  height: 1px;
  background: #FFF;
`;


export const IntroDevsContainerTop = styled.div`
    display: flex;
    padding-top: 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
`;

export const IntroDevsContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 80px;
  align-self: stretch;
`;

export const IntroDevsContainerBottomBody = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

export const ContainerBottom = styled.div`
  display: flex;
  padding: 40px 10px 120px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

export const IntroDevsTitleText = styled.div`
  color: var(--font-1, #343030);

  /* Heading2 pretendard-bold 32px */
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 112.5% */
`;

export const IntroDevsText = styled.div`
  color: var(--font-1, #343030);
  font-feature-settings: 'clig' off, 'liga' off;

  /* Body1 Pretendard-medium 16px */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
`;

export const IntroDevsSubTitleText = styled.div`
  color: var(--font-1, #343030);
  font-feature-settings: 'clig' off, 'liga' off;

  /* Heading1 pretendard-bold 20px */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 120% */
`;

export const IntroDevsDetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const IntroImg = styled.img`

  display: flex;
  width: 320px;
  align-items: flex-start;
  position: relative;
  z-index: 99;
  /* shadow */
`;