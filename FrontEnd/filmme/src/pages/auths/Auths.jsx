import React, { useEffect } from 'react';
import * as S from "./style.jsx";
import AOS from 'aos';
import LoginpageImage from "../../assets/images/Login/LoginpageImage.png";
import LoginButton from "../../assets/images/Login/LoginButton.png";

function Auths() {

    useEffect(() => {
        AOS.init();
    }, []);

    const handleLogin = () => {
        const socialLoginUrl = 'http://127.0.0.1:8000/api/accounts/kakao/login'; // 소셜 로그인 URL로 변경하세요
        window.location.href = socialLoginUrl; // URL로 리디렉션
    };

    return (
        <div className='login' data-aos="zoom-in">
            <S.LoginImage src={LoginpageImage} alt="LoginpageImage" />
            <S.LoginButton src={LoginButton} alt="LoginButton" onClick={handleLogin} />
        </div>
    );
}

export default Auths;
