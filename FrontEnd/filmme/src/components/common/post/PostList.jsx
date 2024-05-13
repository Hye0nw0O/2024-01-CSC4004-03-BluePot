import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import * as S from "./style";

// 컴포넌트
import Selector from "../selector/Selector";
// import Paging from "../paging/Paging";
import { useRecoilState } from "recoil";
import { userState } from "../authState/authState";
// import NoPage from "../../community/noPage/NoPage";

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
    case "communityCommon":
      thList = ["번호", "제목", "등록일시", "좋아요", "조회수"];
      break;
    case "communityReviews":
      thList = ["번호", "제목", "영화관명", "등록일시", "좋아요", "조회수"];
      break;
    case "communitySuggestions":
      thList = ["번호", "제목", "등록일시", "답변 여부"];
      break;
  }

  // 회원 정보
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const navigate = useNavigate();

  // //Paging
  // // 한 페이지당 보여줄 게시글 수
  const itemsPerPage = 10;

  // // 페이지 변경 핸들러
  // const handlePageChange = pageNumber => {
  //   setCurrentPage(pageNumber);
  // };

  // const [isMobile, setisMobile] = useState(false);

  // const resizingHandler = () => {
  //   if (window.innerWidth < 550) {
  //     setisMobile(true);
  //   } else {
  //     setisMobile(false);
  //   }
  // };

  const ifThListContain = thTitle => {
    if (thList.includes(thTitle)) {
      return true;
    } else {
      return false;
    }
  };

  // useEffect(() => {
  //   if (window.innerWidth <= 550) {
  //     setisMobile(true);
  //   }
  //   window.addEventListener("resize", resizingHandler);

  //   return () => {
  //     window.removeEventListener("resize", resizingHandler);
  //   };
  // });

  return (
    <>
      <S.PostListWrap>
        <S.PostListHeader>
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
          </S.PostListHeaderWrapper>

          {currentOption != "" ? (
            <S.PostListHeaderSort>
              <Selector
                options={SelectorOption}
                getCurrentOption={getCurrentOption}
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
                                {currentOption === "popular" || currentOption === "like"
                                    ? idx + 1 + (currentPage - 1) * itemsPerPage
                                    : count - idx - (currentPage - 1) * itemsPerPage}
                            </S.PostListTableTd>
                        ) : null}

                        {ifThListContain("제목") ? (
                            <S.PostListTableTdTitle>
                                {data.title}
                                {data.comments_cnt != undefined ? (
                                    <strong
                                        style={{ fontSize: "1.6rem", color: "#4285F4" }}
                                    >
                                        [{data.comments_cnt}]
                                    </strong>
                                ) : null}
                            </S.PostListTableTdTitle>
                        ) : null}

                        {ifThListContain("서비스명") ? (
                            <S.PostListTableTd>{data.cinema}</S.PostListTableTd>
                        ) : null}

                        {ifThListContain("등록일시") ? (
                            <S.PostListTableTd>{data.created_at?.split(" ")[0]}</S.PostListTableTd>
                        ) : null}

                        {ifThListContain("좋아요") ? (
                            <S.PostListTableTd>{data.likes_cnt}</S.PostListTableTd>
                        ) : null}

                        {ifThListContain("조회수") ? (
                            <S.PostListTableTd>{data.view_cnt}</S.PostListTableTd>
                        ) : null}

                        {ifThListContain("반영여부") ? (
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
        {/* 페이지네이션 컴포넌트 사용 */}
          {/* <Paging
            page={currentPage}
            count={count}
            postPerPage={itemsPerPage}
            setPage={handlePageChange}
          /> */}
      </S.PostListWrap>
    </>
  );
};

export default PostList;