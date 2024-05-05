import React, { useState, useEffect, useRef } from "react";
import * as S from "./style.jsx";
import searchImage from "../../assets/images/Main/searchImage.png";

function Main() {
    return (
        <>
        <S.MainWrapper>
            <S.Title>FILM'E</S.Title>
            <S.subTitle>전국의 독립예술영화관 모아보기</S.subTitle>
        </S.MainWrapper>
        <div class="search">
            <S.searchBox></S.searchBox>
            <S.search>검색어를 입력하세요.</S.search>
            <S.searchImage src={searchImage} alt="searchImage"/>
        </div>
        <div class="region">
            <S.regionContainer>
                <S.regionBackground1><S.region>전체</S.region></S.regionBackground1>
                <S.regionBackground2><S.region>서울</S.region></S.regionBackground2>
                <S.regionBackground3><S.region>인천</S.region></S.regionBackground3>
                <S.regionBackground4><S.region>경기</S.region></S.regionBackground4>
                <S.regionBackground5><S.region>강원</S.region></S.regionBackground5>
                <S.regionBackground6><S.region>대전</S.region></S.regionBackground6>
                <S.regionBackground7><S.region>세종</S.region></S.regionBackground7>
                <S.regionBackground8><S.region>충남</S.region></S.regionBackground8>
                <S.regionBackground9><S.region>충북</S.region></S.regionBackground9>
                <S.regionBackground2><S.region>서울</S.region></S.regionBackground2>
                <S.regionBackground3><S.region>인천</S.region></S.regionBackground3>
                <S.regionBackground4><S.region>경기</S.region></S.regionBackground4>
                <S.regionBackground5><S.region>강원</S.region></S.regionBackground5>
                <S.regionBackground6><S.region>대전</S.region></S.regionBackground6>
                <S.regionBackground7><S.region>세종</S.region></S.regionBackground7>
                <S.regionBackground8><S.region>충남</S.region></S.regionBackground8>
                <S.regionBackground9><S.region>충북</S.region></S.regionBackground9>
                <S.regionBackground10><S.region>광주</S.region></S.regionBackground10>
                <S.regionBackground11><S.region>전남</S.region></S.regionBackground11>
                <S.regionBackground12><S.region>전북</S.region></S.regionBackground12>
                <S.regionBackground13><S.region>경남</S.region></S.regionBackground13>
                <S.regionBackground14><S.region>경북</S.region></S.regionBackground14>
                <S.regionBackground15><S.region>대구</S.region></S.regionBackground15>
                <S.regionBackground16><S.region>부산</S.region></S.regionBackground16>
                <S.regionBackground17><S.region>울산</S.region></S.regionBackground17>
                <S.regionBackground18><S.region>제주</S.region></S.regionBackground18>
            </S.regionContainer>
        </div>
        </>
    );
}

export default Main;