import * as S from './style';
import Logo from '../../../../public/logo.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function NavBar() {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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
    

    return (
    <S.Nav>
        <S.Logo>
            <img src={Logo} alt="로고" />
        </S.Logo>

        <S.NavTabWrapper isOpen={isOpen}>
            <S.NavTab to="/" isOpen={isOpen}>영화관 소개</S.NavTab>
            <S.NavTab to="/community" isOpen={isOpen}>커뮤니티</S.NavTab>
            <S.NavTab to="/about" isOpen={isOpen}>서비스 소개</S.NavTab>
            <S.NavTab to="/auths" isOpen={isOpen}>로그인</S.NavTab>
        </S.NavTabWrapper>
    </S.Nav>
    );
}

export default NavBar;