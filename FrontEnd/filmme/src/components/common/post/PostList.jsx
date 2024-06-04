import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as S from "./style";

import Likes from '../../../assets/images/Community/thumb.svg';
import Comments from '../../../assets/images/Community/comment.svg';
import EyeOutlineIcon from '../../../assets/images/Community/eye_outline.png';

import CommunitySearch from '../../community/communitySearch/CommunitySearch';

// 컴포넌트
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
  
  let thList = [];
  switch (use) {
    case "communityCommons":
      // 조회수 추가해야 함
      thList = ["번호", "제목", "등록일시", "좋아요", "조회수"];
      break;
    case "communityTips":
      thList = ["번호", "제목", "영화관명", "등록일시", "좋아요", "조회수"];
      break;
    case "communitySuggestions":
      thList = ["번호", "제목", "등록일시", "답변 여부"];
      break;
  }

  // 회원 정보
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();

  // 한 페이지당 보여줄 게시글 수
  const itemsPerPage = 10;

  // 페이지 변경 핸들러
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // 인기 게시물
  const [popularPost, setPopularPost] = useState(null);
  const [isMobile, setisMobile] = useState(false);
  const [sortOption, setSortOption] = useState("latest");

  const ifThListContain = thTitle => thList.includes(thTitle);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `/api/communities/${category}?page=${currentPage}`;
        if (sortOption === "like") {
          apiUrl += "&ordering=like";
        } else if (sortOption === "popular") {
          apiUrl += "&ordering=popular";
        } else {
          apiUrl += "&ordering=latest";
        }

        const response = await axios.get(apiUrl);
        setData(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [category, currentPage, sortOption]);

  useEffect(() => {
    setCurrentPage(1); // 정렬 옵션이 변경될 때 페이지를 1로 초기화
  }, [sortOption]);

  const resizingHandler = () => {
    if (window.innerWidth < 550) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };

  useEffect(() => {
    // 인기 게시물 관련 기능
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
        <S.PostListHeader>
          {/* 금주의 인기글 표시 */}
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
                        : ""
                      }
                    </S.PopularPostsList>
                  )}
              </S.PopularPostsHeader>
          ) : null}
                      <CommunitySearch/>
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

          {currentOption != "" ? (
            <S.PostListHeaderSort>
              <Selector
                options={SelectorOption}
                getCurrentOption={setSortOption}
              />
            </S.PostListHeaderSort>
          ) : (
            <></>
          )}
        </S.PostListHeader>
        

        {/* */}

        <S.PostListTable>
            <S.PostListTableThead>
                <S.PostListTableTr>
                    {thList.map((thTitle, idx) => (
                        <S.PostListTableTh key={idx}>{thTitle}</S.PostListTableTh>
                    ))}
                </S.PostListTableTr>
            </S.PostListTableThead>
            <S.PostListTableTbody>
                { data && data.map((data, idx) => (
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
        {/* 글 작성 버튼 */}
        {use != "notice" ? (
        <S.PostListHeaderWrite>
          {/* 로그인하지 않은 경우 로그인 페이지로 이동하기 */}
          <S.PostListHeaderWriteContent
            onClick={() => {navigate(writeUrl, {
              state: { category: category, cinema: currentCinemaOption }
              });
          }}
          >
          <S.StyledPencilIcon />
            글쓰기
          </S.PostListHeaderWriteContent>
          </S.PostListHeaderWrite>
          ) : (
          <></>
        )}
        {/* 페이지네이션 컴포넌트 사용 */}
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