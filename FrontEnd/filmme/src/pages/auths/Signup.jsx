import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from "./style.jsx";
import axios from 'axios';

function Signup() {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!/^(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
            alert("비밀번호는 8자 이상이어야 하며, 특수문자를 포함해야 합니다.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/signup', { nickname, email, password });
            if (response.status === 200) {
                alert("회원가입 성공!");
                navigate('/auths'); // 로그인 페이지로 이동
            } else {
                alert("회원가입에 실패했습니다.");
            }
        } catch (error) {
            console.error("회원가입 중 오류가 발생했습니다:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className='signup' data-aos="zoom-in">
            <S.Form>
                <S.Input 
                    type="text" 
                    placeholder="닉네임" 
                    value={nickname} 
                    onChange={(e) => setNickname(e.target.value)} 
                />
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
                <S.Button onClick={handleSignup}>회원가입</S.Button>
            </S.Form>
        </div>
    );
}

export default Signup;
