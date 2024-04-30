import * as S from './style';

function Footer() {
    return (
        <S.FooterWrapper>
        <S.FooterLeft>
            <S.FooterTitle>필름미(FILM'E)</S.FooterTitle>
            <S.FooterSubTitle>
            공개SW프로젝트 03분반 3팀 블루팟
            </S.FooterSubTitle>
            <S.FooterMiniTitle>
            @ BluePot. All rights reserved
            </S.FooterMiniTitle>
        </S.FooterLeft>

        <S.FooterRight>
            <S.FooterImg />
            <S.FooterImg />
            <S.FooterImg />
        </S.FooterRight>
        </S.FooterWrapper>
    );
}

export default Footer;