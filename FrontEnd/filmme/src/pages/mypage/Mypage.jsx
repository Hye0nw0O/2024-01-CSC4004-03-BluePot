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

function Mypage() {
    const navigate = useNavigate();

    const [displayedTitle, setDisplayedTitle] = useState("");

    const fullTitle = "000님의 마이페이지입니다.";

    useEffect(() => {
        let currentCharIndex = 0;
        const interval = setInterval(() => {
            setDisplayedTitle(fullTitle.slice(0, currentCharIndex + 1));
            currentCharIndex++;
            if (currentCharIndex === fullTitle.length) {
                clearInterval(interval);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
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
                        <S.ProfileName>
                            <S.ChangeNameButton>닉네임 수정</S.ChangeNameButton>
                        </S.ProfileName>
                        <S.Email>이메일예이일@어쩌구.com</S.Email>
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
            </S.MypageWrapper>
        </>
    );
}

export default Mypage;
