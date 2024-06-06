import React from "react";
import * as S from "./style";

function CommunityDetailPageType({ type, cinemaName }) {
    return (
        <S.DetailPageType>
            {cinemaName && (
                <>
                    <S.DetailPageCinemaText>{cinemaName}</S.DetailPageCinemaText>
                </>
            )}

            <S.DetailPageTypeText>
                {type === "commons"
                    ? "자유게시판"
                    : type === "tips"
                    ? "영화관 후기"
                    : type === "suggestions"
                    ? "건의하기"
                    : "수정"}
            </S.DetailPageTypeText>
        </S.DetailPageType>
    );
}

export default CommunityDetailPageType;