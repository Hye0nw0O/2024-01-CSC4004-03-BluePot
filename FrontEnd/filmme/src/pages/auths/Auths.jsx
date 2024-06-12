import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./style.jsx";
import AOS from 'aos';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState } from '../../context/authState';
import LoginpageImage from "../../assets/images/Login/LoginpageImage.png";

function Auths() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState);

    useEffect(() => {
        AOS.init();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login', { email, password });
            if (response.status === 200) {
                alert("로그인 성공!");
                // 받은 토큰을 로컬 스토리지에 저장!
                const userInfo = {
                    accessToken: response.data.token.access,
                    refreshToken: response.data.token.refresh,
                    nickname: response.data.user.nickname,
                    email: response.data.user.email
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                // Recoil 상태 업데이트
                setAuth({
                    isLoggedIn: true,
                    userInfo: userInfo
                });
                navigate('/');
            } else {
                alert("닉네임 또는 비밀번호를 확인하세요.");
            }
        } catch (error) {
            console.error("로그인 중 오류가 발생했습니다:", error);
            alert("로그인 중 오류가 발생했습니다.");
        }
    };

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className='login' data-aos="zoom-in">
            <S.LoginImage src={LoginpageImage} alt="LoginpageImage" />
            <S.Form>
                <S.Input 
                    type="email" 
                    placeholder="이메일" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <S.Input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <S.Button onClick={handleLogin}>로그인</S.Button>
                <S.SignupButton onClick={() => navigate('/signup')}>회원가입</S.SignupButton>
            </S.Form>
        </div>
    );
}

export default Auths;
