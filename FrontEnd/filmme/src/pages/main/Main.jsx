import React, { useState, useEffect } from "react";
import * as S from "./style.jsx";
import Card from '../../components/card/Card.jsx'
import Modal from '../../components/card/Modal.jsx';
import searchImage from "../../assets/images/Main/searchImage.png";
import AOS from 'aos';
import axios from 'axios';

function Main() {
    const [theaters, setTheaters] = useState([]);
    const [clickedRegion, setClickedRegion] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTheaters, setFilteredTheaters] = useState([]);
    const [isPlaceholderHidden, setIsPlaceholderHidden] = useState(false);
    const [sortBy, setSortBy] = useState("ascending");
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [isLikeRequesting, setIsLikeRequesting] = useState(false);
    const [currentMovies, setCurrentMovies] = useState([]);
    const regionNames = ["전체", "서울", "인천", "경기", "강원", "대전", "세종", "충남", "충북", "광주", "전남", "전북", "경남", "경북", "대구", "부산", "울산", "제주"];

    //정렬 옵션 목록
    const sortOptions = [
    { value: "ascending", label: "오름차순" },
    { value: "descending", label: "내림차순" },
    { value: "rating", label: "평점순" },
    { value: "likes", label: "좋아요순" }
];

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/cinemas/')  // IP 주소와 포트를 올바르게 업데이트
            .then(response => {
                const theatersWithLikeStatus = response.data.map(theater => ({
                    ...theater,
                    isLiked: false
                }));
                setTheaters(theatersWithLikeStatus);
                setFilteredTheaters(theatersWithLikeStatus);
            })
            .catch(error => {
                console.error("영화관 정보를 가져오는 중 오류가 발생했습니다!", error);
            });
    }, []);

    useEffect(() => {
        filterAndSortTheaters();
      }, [searchQuery, sortBy, theaters]);
    
      const filterAndSortTheaters = () => {
        let filtered = theaters.filter(theater => theater.name.toLowerCase().includes(searchQuery.toLowerCase()));
        if (clickedRegion !== 0) {
            filtered = filtered.filter(theater => theater.location === regionNames[clickedRegion]);
        }
        filtered = sortTheaters(filtered);
        setFilteredTheaters(filtered);
    };
    

    // 검색어 입력 시 placeholder 가리기
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setIsPlaceholderHidden(true);
    }

    // 지역 선택
    const renderRegions = () => {

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
    const sortTheaters = (theaters) => {
        switch (sortBy) {
            case "ascending":
                return theaters.sort((a, b) => a.name.localeCompare(b.name));
            case "descending":
                return theaters.sort((a, b) => b.name.localeCompare(a.name));
            case "rating":
                return theaters.sort((a, b) => b.star - a.star);
            case "likes":
                return theaters.sort((a, b) => b.like_cnt - a.like_cnt);
            default:
                return theaters;
        }
    }

    const handleSortChange = (option) => {
        setSortBy(option);
        const sortedTheaters = sortTheaters(option);
        setFilteredTheaters(sortedTheaters);
    }

    const handleLikeToggle = async (id) => {
        if (isLikeRequesting) return; // 좋아요 요청 중이면 중복 요청 방지
        setIsLikeRequesting(true); // 좋아요 요청 중으로 설정
        try {
            const response = await axios.post(`http://localhost:8000/api/cinemas/like/${id}/`);
            if (response.status === 200) {
                const updatedTheaters = theaters.map(theater => {
                    if (theater.id === id) {
                        const isLiked = !theater.isLiked;
                        return {
                            ...theater,
                            isLiked: isLiked,
                            like_cnt: theater.isLiked ? theater.like_cnt - 1 : theater.like_cnt + 1 // 좋아요 수를 1씩 증가 또는 감소
                        };
                    }
                    return theater;
                });
                setTheaters(updatedTheaters);
                setFilteredTheaters(sortTheaters(updatedTheaters));
            } else {
                console.error("좋아요를 업데이트하는 데 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("서버 요청 중 오류가 발생했습니다:", error);
        } finally {
            setIsLikeRequesting(false); // 요청 완료 후 상태 업데이트
        }
    };

    // 별 출력
    const renderStarRating = (score) => {
        const starCount = Math.round(score); // 점수 반올림
        const stars = '⭐'.repeat(starCount); 
        return stars;
    };
    

    // 영화관 리스트
    const ViewTheater = () => {
        let theatersToDisplay = filteredTheaters;

        if (clickedRegion !== 0) {
            theatersToDisplay = filteredTheaters.filter(theater => theater.location === regionNames[clickedRegion]);
        }

        return theatersToDisplay.map(theater => (
            <Card
                key={theater.id}
                id={theater.id}
                name={theater.name}
                region={theater.location}
                star={renderStarRating(theater.star)}
                score={theater.star}
                like={theater.like_cnt}
                img={theater.view_url}
                onClick={() => handleCardClick(theater)}
                onLikeToggle={handleLikeToggle}
                isLiked={theater.isLiked}
            />
        ));
    }

    const handleCardClick = (theater) => {
        const regionColors = {
            '서울': '#AEAFB9',
            '인천': 'red',
            '경기': 'orange',
            '강원': 'yellow',
            '대전': '#7FFF00',
            '세종': 'green',
            '충남': 'skyblue',
            '충북': '#00CED1',
            '광주': 'blue',
            '전남': '#00008B',
            '전북': 'purple',
            '경남': 'pink',
            '경북': '#8A2BE2',
            '대구': '#A52A2A',
            '부산': '#808000',
            '울산': '#FFB07C',
            '제주': '#ADD8E6',
            default: '#AEAFB9'
        };

        setCurrentMovies([]);

        axios.get(`http://localhost:8000/api/cinemas/detail/${theater.id}/`)
        .then(response => {
            const movies = response.data.movies || [];
            setCurrentMovies(movies);

            setModalContent(
                <div>
                    <S.ModalImage src={theater.view_url} alt={theater.name} /><hr /><br /><br />
                    <S.NameRegionContainer>
                        <S.ModalName>{theater.name}</S.ModalName>
                        <S.ModalRegion color={regionColors[theater.location] || regionColors.default}>{theater.location}</S.ModalRegion>
                    </S.NameRegionContainer><br /><br />
                    <S.ModalDescription>{theater.description}</S.ModalDescription><br /><br /><br />
                    <S.ModalURL href={theater.cite_url} target="_blank" rel="noopener noreferrer">🎬 영화관 홈페이지 바로가기</S.ModalURL><br/><br/><br/><br/>
                    <S.Movie>📽 현재 상영 중인 영화 📽</S.Movie><br/>
                    <S.MovieList>
                        {movies.map((movie, index) => (
                            <S.MovieListItem key={index}>
                                <S.MoviePoster src={movie.poster_url} /><br/>
                                {movie.name}
                            </S.MovieListItem>
                        ))}
                    </S.MovieList>
                </div>
            );
            setShowModal(true);
        })
        .catch(error => {
            console.error("현재 상영 중인 영화를 가져오는 중 오류가 발생했습니다:", error);
        });
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
            <Modal show={showModal} onClose={() => setShowModal(false)} content={modalContent} />
        </>
    );
}

export default Main;