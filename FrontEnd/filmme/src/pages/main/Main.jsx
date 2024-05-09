import React, { useState, useEffect, useRef } from "react";
import * as S from "./style.jsx";
import Card from '../../components/card/Card.jsx'
import searchImage from "../../assets/images/Main/searchImage.png";
import theater from "../../data/theater.js";
import AOS from 'aos';

function Main() {
    const [clickedRegion, setClickedRegion] = useState(null);

    const renderRegions = () => {
        const regionNames = ["전체", "서울", "인천", "경기", "강원", "대전", "세종", "충남", "충북", "광주", "전남", "전북", "경남", "경북", "대구", "부산", "울산", "제주"];

        return regionNames.map((regionName, index) => (
            <S.region
                key={index}
                onClick={() => setClickedRegion(index)}
                isActive={clickedRegion === index}
            >
                {regionName}
            </S.region>
        ));
    }

    const ViewTheater = () => {
        return theater.map(theater => (
            <Card
                id={theater.id}
                name={theater.name}
                region={theater.region}
                star={theater.star}
                score={theater.score}
                like={theater.like}
                img={theater.img}
        />
        ))
    }

    return (
        <>
        <S.MainWrapper>
            <S.TitleWrapper>
                <S.Title>FILM'E</S.Title>
                <S.subTitle>전국의 독립예술영화관 모아보기 </S.subTitle>
            </S.TitleWrapper>
            <div className="Search">
                <S.searchBox></S.searchBox>
                <S.search>검색어를 입력하세요.</S.search>
                <S.searchImage src={searchImage} alt="searchImage"/>
            </div>
            <div className="Region">
                <S.regionContainer>
                    {renderRegions()}    
                </S.regionContainer>  
            </div>
            <div className="Theater">
                <S.TheaterContainer data-aos="fade-down">
                    {ViewTheater()}
                </S.TheaterContainer>
            </div>
        </S.MainWrapper>
        </>
    );
}

export default Main;