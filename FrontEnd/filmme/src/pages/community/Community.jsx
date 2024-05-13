import React, { useState } from "react";
import * as S from "./style.jsx";

import CommunitySearch from "../../components/community/communitySearch/CommunitySearch";

import CommunitySuggestion from "../../components/community/communitySuggestion/CommunitySuggestion";
import CommunityCommon from "../../components/community/communityCommon/CommunityCommon";
import CommunityReview from "../../components/community/communityReview/CommunityReview";

function Community() {
    // 세 가지 탭 기능
    const [currentTab, setCurrentTab] = useState(0);

    const tabContents = [
        <CommunityCommon />,
        <CommunityReview />,
        <CommunitySuggestion />
    ];

    const selectMenuHandler = index => {
        setCurrentTab(index);
    }
    
    return (
        <S.CommunityWrapper>
            <S.CommunityHeaderWrapper>
                <S.CommunityTitle>Community</S.CommunityTitle>
                <S.CommunitySubTitle>어쩌구 커뮤니티에 관한 설명 어쩌구</S.CommunitySubTitle>
            </S.CommunityHeaderWrapper>

            <CommunitySearch/>

            <S.CommunityContentWrapper>
                <S.CommunityContentCategory>
                    <S.CommunityContentCategoryTabMenu>
                    <S.CommunityContentCategoryMenuItem
                        $isActive={currentTab === 0}
                        onClick={() => selectMenuHandler(0)}
                    >
                        자유
                    </S.CommunityContentCategoryMenuItem>
                    <S.CommunityContentCategoryMenuItem
                        $isActive={currentTab === 1}
                        onClick={() => selectMenuHandler(1)}
                    >
                        영화관 후기
                    </S.CommunityContentCategoryMenuItem>
                    <S.CommunityContentCategoryMenuItem
                        $isActive={currentTab === 2}
                        onClick={() => selectMenuHandler(2)}
                    >
                        건의하기
                    </S.CommunityContentCategoryMenuItem>
                    </S.CommunityContentCategoryTabMenu>
                </S.CommunityContentCategory>
                {tabContents[currentTab]}
            </S.CommunityContentWrapper>
        </S.CommunityWrapper>
    );
}

export default Community;