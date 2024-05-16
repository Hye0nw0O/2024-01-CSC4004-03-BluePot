import React, { useState, useEffect } from "react";
import * as S from "./style.jsx";
import Card from '../../components/card/Card.jsx'
import searchImage from "../../assets/images/Main/searchImage.png";
import theater from "../../data/theater.js";
import AOS from 'aos';

function Main() {
    const [clickedRegion, setClickedRegion] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTheaters, setFilteredTheaters] = useState([]);
    const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);
    const [sortBy, setSortBy] = useState("latest");

    //정렬 옵션 목록
    const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "ascending", label: "오름차순" },
    { value: "descending", label: "내림차순" },
    { value: "rating", label: "평점순" },
    { value: "likes", label: "좋아요순" }
];

    useEffect(() => {
        AOS.init();
    }, []);

    // 영화관 검색 필터
    useEffect(() => {
        const filtered = theater.filter(theater =>
            theater.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const sortedTheaters = sortBy === "latest" ? filtered.reverse() : sortBy === "ascending" ? filtered.sort((a, b) => a.name.localeCompare(b.name)) : filtered;
        setFilteredTheaters(sortedTheaters);
    }, [searchQuery, sortBy]);

    // 검색어 입력 시 placeholder 가리기
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setIsPlaceholderHidden(true);
    }

    // 지역 선택
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

    //정렬 기능
    const sortTheaters = (option) => {
        switch (option) {
            case "latest":
                return filteredTheaters.reverse();
            case "ascending":
                return filteredTheaters.sort((a, b) => a.name.localeCompare(b.name));
            case "descending":
                return filteredTheaters.sort((a, b) => b.name.localeCompare(a.name));
            case "rating":
                return filteredTheaters.sort((a, b) => b.score - a.score);
            case "likes":
                return filteredTheaters.sort((a, b) => b.like - a.like);
            default:
                return filteredTheaters;
        }
    }

    const handleSortChange = (option) => {
        setSortBy(option);
        const sortedTheaters = sortTheaters(option);
        setFilteredTheaters(sortedTheaters);
    }

    // 영화관 리스트
    const ViewTheater = () => {
        return filteredTheaters.map(theater => (
            <Card
                key={theater.id}
                id={theater.id}
                name={theater.name}
                region={theater.region}
                star={theater.star}
                score={theater.score}
                like={theater.like}
                img={theater.img}
            />
        ));
    }

    return (
        <>
            <S.MainWrapper>
                <S.TitleWrapper>
                    <S.Title>FILM'E</S.Title>
                    <S.subTitle>전국의 독립예술영화관 모아보기 </S.subTitle>
                </S.TitleWrapper>
                <div className="Search">
                    <S.searchBox>
                        <S.Input
                            type="text"
                            placeholder={isPlaceholderHidden ? "" : "검색어를 입력하세요."}
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onFocus={() => setIsPlaceholderHidden(true)}
                            onBlur={() => setIsPlaceholderHidden(searchQuery !== "")
                            }
                        />
                    </S.searchBox>
                    <S.searchImage src={searchImage} alt="searchImage"/>
                </div>
                <div className="Region">
                    <S.regionContainer>
                        {renderRegions()}    
                    </S.regionContainer>  
                </div>
                <div className="Sort">
                    <S.SortContainer>
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                        {sortOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    </S.SortContainer>
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