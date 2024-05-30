import React, { useState } from "react";
import * as S from "./style.jsx";
import profileImage from "../../../public/images/mypage/profile_image.svg";

function Mypage() {

    // const [currentTab, setCurrentTab] = useState(0);

    // const tabContents = [
    //     <CommunityCommon />,
    //     <CommunityReview />,
    //     <CommunitySuggestion />
    // ];

    // const selectMenuHandler = index => {
    //     setCurrentTab(index);
    // }
    
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
                    <S.Email>2022110233@dgu.ac.kr</S.Email>
                </S.Profile>
            </S.MypageHeaderWrapper>
            <S.MyFilmmeRecord> 
                <S.FilmmeRecordTitle>
                    나의 필름미 활동 기록
                </S.FilmmeRecordTitle>
                <S.Record>
                    
                </S.Record>
            </S.MyFilmmeRecord>
            <S.MyCinemaRecord>

            </S.MyCinemaRecord>
        </S.MypageWrapper>
    );
}

export default Mypage;