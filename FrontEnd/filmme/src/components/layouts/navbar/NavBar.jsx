import * as S from './style';
import Logo from '../../../../public/logo.svg';

function NavBar() {
    return (
    <S.Nav>
        <S.Logo>
            <img src={Logo} alt="로고" />
        </S.Logo>

        <S.NavTabWrapper>
            <S.NavTab to="/">영화관 소개</S.NavTab>
            <S.NavTab to="/community">커뮤니티</S.NavTab>
            <S.NavTab to="/about">서비스 소개</S.NavTab>
            <S.NavTab to="/auths">로그인</S.NavTab>
        </S.NavTabWrapper>
    </S.Nav>
    );
}

export default NavBar;