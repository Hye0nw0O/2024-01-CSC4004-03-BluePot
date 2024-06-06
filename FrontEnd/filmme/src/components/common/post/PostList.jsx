import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import Likes from '../../../assets/images/Community/thumb.svg';
import EyeOutlineIcon from '../../../assets/images/Community/eye_outline.png';
import CommunitySearch from '../../community/communitySearch/CommunitySearch';
import Selector from "../selector/Selector";
import Paging from "../paging/Paging";
import { useRecoilState } from "recoil";
import { userState } from "../authState/authState";
import ListView from "../../common/paging/List";
import { getCinemas } from "../../../apis/api/community/community"; // getCinemas 가져오기

const PostList = ({
  use,
  category = "",
  data,
  url,
  writeUrl,
  currentOption = "",
  currentCinemaOption = "",
  SelectorOption,
  cinemaOption = "",
  getCurrentOption = "",
  getCurrentCinemaOption = "",
  currentPage,
  setCurrentPage,
  count
}) => {
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [cinemaList, setCinemaList] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const cinemas = await getCinemas();
        setCinemaList(cinemas);
      } catch (error) {
        console.error("Failed to fetch cinemas:", error);
      }
    };

    fetchCinemas();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (searchWord) {
      filtered = filtered.filter(post =>
        post.title.includes(searchWord) ||
        post.content.includes(searchWord) ||
        (post.cinema && post.cinema.includes(searchWord))
      );
    }
    if (selectedCinema) {
      filtered = filtered.filter(post => post.cinema === selectedCinema);
    }
    setFilteredData(filtered);
  }, [searchWord, data, selectedCinema]);

  useEffect(() => {
    if (filteredData) {
      let sorted = [...filteredData];
      switch (sortOption) {
        case "latest":
          sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case "popular":
          sorted.sort((a, b) => b.view_cnt - a.view_cnt);
          break;
        case "like":
          sorted.sort((a, b) => b.likes_cnt - a.likes_cnt);
          break;
        default:
          break;
      }
      setSortedData(sorted);
    }
  }, [filteredData, sortOption]);

  const handleSearch = (searchWord) => {
    setSearchWord(searchWord);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  const handleCinemaChange = (cinema) => {
    setSelectedCinema(cinema);
    setCurrentCinemaOption(cinema);
  };

  let thList = [];
  switch (use) {
    case "communityCommons":
      thList = ["번호", "제목", "등록일시", "좋아요", "조회수"];
      break;
    case "communityTips":
      thList = ["번호", "제목", "영화관명", "등록일시", "좋아요", "조회수"];
      break;
    case "communitySuggestions":
      thList = ["번호", "제목", "등록일시", "답변 여부"];
      break;
  }

  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const [popularPosts, setPopularPosts] = useState([]);
  const [isMobile, setisMobile] = useState(false);

  const ifThListContain = thTitle => thList.includes(thTitle);

  const resizingHandler = () => {
    if (window.innerWidth < 550) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    if (data && data.length > 0) {
      const filteredData = data.filter(post => {
        const postDate = new Date(post.created_at);
        return postDate >= lastWeek && postDate <= today;
      });

      if (filteredData.length > 0) {
        const sortedByLikes = filteredData.sort((a, b) => b.likes_cnt - a.likes_cnt);
        setPopularPosts(sortedByLikes.slice(0, 3)); // 상위 3개 인기 게시물 설정
      }
    }
    if (window.innerWidth <= 550) {
      setisMobile(true);
    }
    window.addEventListener("resize", resizingHandler);

    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, [data]);

  useEffect(() => {
    console.log("PostList data:", data);
  }, [data]);

  const handlePopularPostClick = (id) => {
    navigate(`${url}${id}`);
  };

  const getMedalEmoji = (index) => {
    switch(index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  return (
    <>
      <S.PostListWrap>
        <CommunitySearch onSearch={handleSearch} />
        <S.PostListHeader>
          <S.PopularPostsSection>
            {use === "communityCommons" || use === "communityTips" ? (
              <S.PopularPostsHeader>
                🍿 금주의 인기글
                {popularPosts.map((post, index) => (
                  <S.PopularPostsList key={index} onClick={() => handlePopularPostClick(post.id)} style={{ cursor: 'pointer', color: '#6069E4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.5rem'}}>
                        {getMedalEmoji(index)}
                        {use === "communityTips" && post.cinema && ` [${post.cinema}]`}
                        {post.title}
                        <br />
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Likes} alt="좋아요수" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                        {post.likes_cnt}
                      </span>
                    </div>
                  </S.PopularPostsList>
                ))}
              </S.PopularPostsHeader>
            ) : null}
          </S.PopularPostsSection>
          <S.PostListHeaderWrapper>
            {(use === "communityTips") && (
              <S.Select
                required
                name="cinemas"
                onChange={e => handleCinemaChange(e.target.value)}
              >
                <S.Option value="">▿ 영화관 선택</S.Option>
                {cinemaList.map((cinema, index) => (
                  <S.Option key={index} value={cinema.name}>
                    {cinema.name}
                  </S.Option>
                ))}
              </S.Select>
            )}
            {currentOption !== "" && use !== "communitySuggestions" ? (
              <S.PostListHeaderSort>
                <Selector
                  options={SelectorOption}
                  getCurrentOption={handleSortChange}
                />
              </S.PostListHeaderSort>
            ) : (
              <></>
            )}
          </S.PostListHeaderWrapper>
        </S.PostListHeader>

        <S.PostListTable>
          <S.PostListTableThead>
            <S.PostListTableTr>
              {thList.map((thTitle, idx) => (
                <S.PostListTableTh key={idx}>{thTitle}</S.PostListTableTh>
              ))}
            </S.PostListTableTr>
          </S.PostListTableThead>
          <S.PostListTableTbody>
            {sortedData && sortedData.map((data, idx) => (
              <S.PostListTableTrContent
                key={data.id}
                onClick={() => navigate(`${url}${data.id}`)}
              >
                {ifThListContain("번호") ? (
                  <S.PostListTableTd>
                    {idx + 1 + (currentPage - 1) * itemsPerPage}
                  </S.PostListTableTd>
                ) : null}

                {ifThListContain("제목") ? (
                  <S.PostListTableTdTitle>
                    {data.title}
                    {data.comments_cnt != undefined ? (
                      <strong
                        style={{ fontSize: "1.6rem", color: "#161835" }}
                      >
                        [{data.comments_cnt}]
                      </strong>
                    ) : null}
                  </S.PostListTableTdTitle>
                ) : null}

                {ifThListContain("영화관명") ? (
                  <S.PostListTableTd>{data.cinema}</S.PostListTableTd>
                ) : null}

                {ifThListContain("등록일시") ? (
                  <S.PostListTableTd>{data.created_at?.split(" ")[0]}</S.PostListTableTd>
                ) : null}

                {ifThListContain("좋아요") ? (
                  <S.PostListTableTd>
                    <img src={Likes} alt="좋아요수" style={{ width: '16px', height: '16px' }} />{data.likes_cnt}
                  </S.PostListTableTd>
                ) : null}

                {ifThListContain("조회수") ? (
                  <S.PostListTableTd>
                    <img src={EyeOutlineIcon} alt="조회수" style={{ width: '16px', height: '16px' }} />{data.view_cnt}
                  </S.PostListTableTd>
                ) : null}

                {ifThListContain("답변 여부") ? (
                  <S.PostListTableTd>
                    {data.reflected_status === 0 ? (
                      <S.StatusText color="#0057FF">답변 완료</S.StatusText>
                    ) : (
                      <S.StatusText color="#9A9A9A">대기 중</S.StatusText>
                    )}
                  </S.PostListTableTd>
                ) : null}
              </S.PostListTableTrContent>
            ))}
          </S.PostListTableTbody>
        </S.PostListTable>
        {use != "notice" ? (
          <S.PostListHeaderWrite>
            <S.PostListHeaderWriteContent
              onClick={() => { 
                navigate(writeUrl, { state: { category: category, cinema: currentCinemaOption } }); 
              }}
            >
              <S.StyledPencilIcon />
              글쓰기
            </S.PostListHeaderWriteContent>

          </S.PostListHeaderWrite>
        ) : (
          <></>
        )}
        <Paging
          page={currentPage}
          count={count}
          postPerPage={itemsPerPage}
          setPage={handlePageChange}
        />
      </S.PostListWrap>
    </>
  );
};

export default PostList;
