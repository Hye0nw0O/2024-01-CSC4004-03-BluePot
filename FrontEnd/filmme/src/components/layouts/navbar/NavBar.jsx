import * as S from './style';
import Logo from '../../../../public/logo.svg';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleOutsideClick = event => {
            if (isOpen && !event.target.closest('#navbar')) {
            setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
        }, [isOpen]);

        // 로그인 상태를 확인하고 상태에 따라 NavBar의 문구를 변경하는 함수
        const renderLoginText = () => {
            if (isLoggedIn) {
                return '마이페이지';
            } else {
                return '로그인';
            }
        };

        // 로그인 상태를 토글하는 함수
        const toggleLogin = () => {
            setIsLoggedIn(prevState => !prevState);
        };
    

    return (
    <S.Nav>
        <S.Logo>
            <Link to="/">
                <img src={Logo} alt="로고" />
            </Link>
        </S.Logo>

        <S.NavTabWrapper isOpen={isOpen}>
            <S.NavTab to="/" isOpen={isOpen}>영화관 소개</S.NavTab>
            <S.NavTab to="/community" isOpen={isOpen}>커뮤니티</S.NavTab>
            <S.NavTab to="/about" isOpen={isOpen}>서비스 소개</S.NavTab>
            <S.NavTab to="/auths" isOpen={isOpen} onClick={toggleLogin}>{renderLoginText()}</S.NavTab>
        </S.NavTabWrapper>
    </S.Nav>
    );
}

export default NavBar;