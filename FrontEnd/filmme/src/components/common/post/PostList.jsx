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

  useEffect(() => {
    if (data) {
      if (searchWord) {
        setFilteredData(data.filter(post =>
          post.title.includes(searchWord) ||
          post.content.includes(searchWord) ||
          (post.cinema && post.cinema.includes(searchWord))
        ));
      } else {
        setFilteredData(data);
      }
    }
  }, [searchWord, data]);

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

  const [popularPost, setPopularPost] = useState(null);
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
        const highestLikes = filteredData.reduce((prev, current) => {
          return (prev.likes_cnt > current.likes_cnt) ? prev : current;
        });
        setPopularPost(highestLikes);
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

  return (
    <>
      <S.PostListWrap>
        <CommunitySearch onSearch={handleSearch} />
        <S.PostListHeader>
          <S.PopularPostsSection>
            {use === "communityCommons" || use === "communityTips" ? (
              <S.PopularPostsHeader>
                🍿 금주의 인기글
                {popularPost && (
                  <S.PopularPostsList>
                    {popularPost.title}
                    <br />
                    {typeof popularPost.content === 'string'
                      ? popularPost.content.slice(0, 20) + (popularPost.content.length > 20 ? "..." : "")
                      : ""}
                  </S.PopularPostsList>
                )}
              </S.PopularPostsHeader>
            ) : null}
          </S.PopularPostsSection>
          <S.PostListHeaderWrapper>
            {cinemaOption != "" ? (
              <S.Select
                required
                name="cinemas"
                onChange={e => getCurrentCinemaOption(e.target.value)}
              >
                <S.Option value="">▿ 영화관 선택</S.Option>
                {cinemaOption.map((cinema, index) => (
                  <S.Option key={index} value={cinema.title}>
                    {cinema.title}
                  </S.Option>
                ))}
              </S.Select>
            ) : (
              <></>
            )}
          </S.PostListHeaderWrapper>

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
              onClick={() => { navigate(writeUrl, { state: { category: category, cinema: currentCinemaOption } }); }}
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
