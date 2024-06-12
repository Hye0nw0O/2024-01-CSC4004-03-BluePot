import * as S from './style';
import Logo from '../../../../public/logo.svg';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../../context/authState';

function NavBar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setAuth({
                isLoggedIn: true,
                userInfo: JSON.parse(storedUserInfo)
            });
        } else {
            setAuth({
                isLoggedIn: false,
                userInfo: null
            });
        }

        const handleOutsideClick = event => {
            if (isOpen && !event.target.closest('#navbar')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, setAuth]);

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
                {auth.isLoggedIn ? (
                    <S.NavTab to="/mypage" isOpen={isOpen}>마이페이지</S.NavTab>
                ) : (
                    <S.NavTab to="/auths" isOpen={isOpen}>로그인</S.NavTab>
                )}
            </S.NavTabWrapper>
        </S.Nav>
    );
}

export default NavBar;
