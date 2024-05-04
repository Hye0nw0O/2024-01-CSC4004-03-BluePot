import styled from 'styled-components';

export const FooterWrapper = styled.div`
    display: flex;
    padding: 32px 16px 20px 16px;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    background-color: #161835;
`;

export const FooterTitle = styled.div`
    font-family: Pretendard-Bold;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 4px;
    color: #FFFFFF;


    @media (max-width: 767px) {
        font-size: 16px;
    }
`;

export const FooterSubTitle = styled.div`
    font-family: Pretendard-Medium;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 24px;
    color: #FFFFFF;

    @media (min-width: 1200px) {
        br.Mobile {
        display: none;
        }
    }

    @media (min-width: 768px) and (max-width: 1199px) {
        br.Mobile {
        display: none;
        }
    }

    @media (max-width: 767px) {
        br.Mobile {
        display: initial;
        }
        font-size: 12.8px;
    }
`;

export const FooterLeft = styled.div`
    color: #737381;
`;

export const FooterMiniTitle = styled.div`
    font-family: Pretendard-Medium;
    font-size: 12px;
    line-height: 16px;
    color: #FFFFFF;

    @media (max-width: 767px) {
        font-size: 9.6px;
    }
`;

export const FooterRight = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`;

const baseFooterImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: cover;

    @media (max-width: 767px) {
        width: 30px;
        height: 30px;
    }
`;

export const FooterImg1 = styled(baseFooterImg)`
    background-image: url('/Footer/insta_logo.svg');
`;

export const FooterImg2 = styled(baseFooterImg)`
    background-image: url('/Footer/github_logo.svg');
`;

export const FooterImg3 = styled(baseFooterImg)`
    background-image: url('/Footer/email_logo.svg');
`;