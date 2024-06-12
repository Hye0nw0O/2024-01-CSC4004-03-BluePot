import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as S from "./style.jsx";
import profileImage from "../../../public/images/mypage/profile_image.svg";
import comment from "../../assets/images/Mypage/comment.png";
import heart from "../../assets/images/Mypage/heart.png";
import post from "../../assets/images/Mypage/post.png";
import thumbup from "../../assets/images/Mypage/thumb-up.png";
import MypageCalendar from "../../components/mypage/mypageRecord/MypageCalender.jsx";
import Confetti from 'react-confetti'; // 벚꽃 효과
import Snowfall from 'react-snowfall'; // 눈 효과
import NicknameChangeModal from "../../components/mypage/nicknameChange/NicknameChangeModal.jsx";
import PasswordChangeModal from "../../components/mypage/password/PasswordChangeModal.jsx";
import axios from 'axios';
import Modal from "../../components/common/modal/Modal.jsx";
import { useRecoilState } from 'recoil';
import { authState } from "../../context/authState.js";

function Mypage() {
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState);

    const [displayedTitle, setDisplayedTitle] = useState("");
    const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
            fetchUserData(storedUserInfo.accessToken);
        } else {
            navigate("/auths");
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await axios.get("https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/mypage/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const user = response.data;
                if (user) {
                    setNickname(user.nickname);
                    setEmail(user.email);
                    setDisplayedTitle(`${user.nickname}님의 마이페이지입니다.`);
                } else {
                    throw new Error("유저 정보가 없습니다.");
                }
            } else {
                alert("유저 정보를 가져오는데 실패했습니다.");
                localStorage.removeItem("userInfo");
                navigate("/auths");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("userInfo");
            navigate("/auths");
            alert("유저 정보를 가져오는데 실패했습니다.");
        }
    };

    useEffect(() => {
        if (nickname) {
            let currentCharIndex = 0;
            const interval = setInterval(() => {
                setDisplayedTitle(prev => nickname + "님의 마이페이지입니다.".slice(0, currentCharIndex + 1));
                currentCharIndex++;
                if (currentCharIndex === (nickname + "님의 마이페이지입니다.").length) {
                    clearInterval(interval);
                }
            }, 200);

            return () => clearInterval(interval);
        }
    }, [nickname]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleNicknameChange = async (newNickname) => {
        try {
            const token = userInfo.accessToken;
            const response = await axios.put("https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/mypage/profile", 
                { nickname: newNickname }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setNickname(newNickname);
                // 닉네임 정보 업뎃
                const updatedUserInfo = { ...userInfo, nickname: newNickname };
                localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
                setUserInfo(updatedUserInfo);
                alert("닉네임이 성공적으로 변경되었습니다.");
            } else {
                alert("닉네임 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error changing nickname:", error);
            alert("닉네임 변경 중 오류가 발생했습니다.");
        }
    };

    const handlePasswordChange = async (currentPassword, newPassword) => {
        try {
            const token = userInfo.accessToken;
            const response = await axios.post("https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/accounts/password/change", 
                { origin_password: currentPassword, new_password1: newPassword, new_password2: newPassword }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
            } else {
                alert("비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    const handleLogout = async () => {
        try {
            const token = userInfo.accessToken;
            await axios.post("https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/user/logout/", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            localStorage.removeItem("userInfo");
            setAuth({ isLoggedIn: false, userInfo: null });
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };


    return (
        <>
        <Snowfall />
            {/* <Confetti
                numberOfPieces={50} // 조각의 수
                recycle={true} // 재사용 여부
                colors={['#FFB7C5', '#FFD9E3']} // 벚꽃 색상
                confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }} // 시작 위치
            /> */}
            <S.MypageWrapper>
                <S.MypageTitle>{displayedTitle}</S.MypageTitle>
                <S.MypageHeaderWrapper>
                    <S.Profile>
                        <S.Email>{email}</S.Email>
                        <S.ProfileName>
                            <S.ChangeNameButton onClick={() => setIsNicknameModalOpen(true)}>닉네임 수정</S.ChangeNameButton>
                            <S.ChangeNameButton onClick={() => setIsPasswordModalOpen(true)}>비밀번호 변경</S.ChangeNameButton>
                        </S.ProfileName>
                    </S.Profile>
                </S.MypageHeaderWrapper>
                <S.MyFilmmeRecord>
                    <S.FilmmeRecordTitle>
                        나의 <S.HighlightedText>필름미</S.HighlightedText> 활동 기록
                    </S.FilmmeRecordTitle>
                    <S.RecordWrapper>
                        <S.RecordCard onClick={() => handleNavigate('liked-cinema')}>
                            <S.RecordCardImage src={thumbup} alt="좋아요 한 영화관" />
                            좋아요 한 영화관
                        </S.RecordCard>
                        <S.RecordCard onClick={() => handleNavigate('liked-post')}>
                            <S.RecordCardImage src={heart} alt="좋아요 한 게시물" />
                            좋아요 한 게시물
                        </S.RecordCard>
                        <S.RecordCard onClick={() => handleNavigate('my-post')}>
                            <S.RecordCardImage src={post} alt="작성한 게시물" />
                            작성한 게시물
                        </S.RecordCard>
                        <S.RecordCard onClick={() => handleNavigate('my-comment')}>
                            <S.RecordCardImage src={comment} alt="작성한 댓글" />
                            작성한 댓글
                        </S.RecordCard>
                    </S.RecordWrapper>
                </S.MyFilmmeRecord>
                <MypageCalendar />
                <S.LogoutButton onClick={() => setIsLogoutModalOpen(true)}>로그아웃</S.LogoutButton>
            </S.MypageWrapper>
            {isNicknameModalOpen && (
                <NicknameChangeModal
                    currentNickname={nickname}
                    onClose={() => setIsNicknameModalOpen(false)}
                    onSave={handleNicknameChange}
                />
            )}
            {isPasswordModalOpen && (
                <PasswordChangeModal
                    onClose={() => setIsPasswordModalOpen(false)}
                    onSave={handlePasswordChange}
                />
            )}
            {isLogoutModalOpen && (
                <Modal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                    content="정말 로그아웃하시겠습니까?"
                />
            )}
        </>
    );
}

export default Mypage;
