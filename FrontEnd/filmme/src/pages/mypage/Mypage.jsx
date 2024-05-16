import React, { useState } from "react";
import * as S from "./style.jsx";

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
            <S.MypageHeaderWrapper>
                <S.MypageTitle>Mypage</S.MypageTitle>
                <S.MypageSubTitle>어쩌구님의 마이페이지</S.MypageSubTitle>
            </S.MypageHeaderWrapper>
        </S.MypageWrapper>
    );
}

export default Mypage;