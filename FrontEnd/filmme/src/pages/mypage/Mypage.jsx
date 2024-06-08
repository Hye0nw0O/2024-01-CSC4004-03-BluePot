import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as S from "./style.jsx";
import profileImage from "../../../public/images/mypage/profile_image.svg";
import comment from "../../assets/images/Mypage/comment.png";
import heart from "../../assets/images/Mypage/heart.png";
import post from "../../assets/images/Mypage/post.png";
import thumbup from "../../assets/images/Mypage/thumb-up.png";

function Mypage() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewingDate, setViewingDate] = useState(new Date());

    const currentMonth = currentDate.getMonth() + 1;
    const viewingMonth = viewingDate.getMonth() + 1;
    const daysInMonth = new Date(viewingDate.getFullYear(), viewingMonth, 0).getDate();

    const handlePreviousMonth = () => {
        setViewingDate(new Date(viewingDate.setMonth(viewingDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setViewingDate(new Date(viewingDate.setMonth(viewingDate.getMonth() + 1)));
    };

    const isCurrentMonth = currentMonth === viewingMonth && currentDate.getFullYear() === viewingDate.getFullYear();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <S.MypageWrapper>
            <S.MypageTitle>Mypage</S.MypageTitle>
            <S.MypageHeaderWrapper>
                <S.ProfileImage src={profileImage} alt="프로필사진" />
                <S.Profile>
                    <S.ProfileName>
                        <S.Name>홍길동</S.Name>
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
            <S.MyCinemaRecord>
                <S.CinemaRecordTitle>
                    <S.Arrow onClick={handlePreviousMonth}>&lt;</S.Arrow>
                    나의 <S.HighlightedText>{viewingMonth}월</S.HighlightedText> 영화 기록
                    <S.Arrow onClick={handleNextMonth}>&gt;</S.Arrow>
                </S.CinemaRecordTitle>
                <S.CinemaRecordGrid isCurrentMonth={isCurrentMonth}>
                    {[...Array(daysInMonth)].map((_, i) => (
                        <S.CinemaRecordCard key={i} isCurrentMonth={isCurrentMonth}>
                            <S.DayNumber>{i + 1}</S.DayNumber>
                        </S.CinemaRecordCard>
                    ))}
                </S.CinemaRecordGrid>
            </S.MyCinemaRecord>
        </S.MypageWrapper>
    );
}

export default Mypage;
