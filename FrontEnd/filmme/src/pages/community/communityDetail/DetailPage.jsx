// import axios from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate, useParams } from "react-router-dom";
import * as S from "./style";

import CommentWrite from "../../../components/common/commentWrite/CommentWrite";
import CommunityCommentList from "../../../components/common/communityCommentList/CommunityCommentList";

function DetailPage() {
  // const [user, setUser] = useRecoilState(userState);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [viewCnt, setViewCnt] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

    // 한 페이지당 보여줄 댓글 수
    const itemsPerPage = 10;
    const navigate = useNavigate();

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
  
    // type에는 common, reviews, suggestions
    const { type, id } = useParams();
  
    // detail 정보 설정
    const [detail, setDetail] = useState({
      
      comments_cnt: 0,
      view_cnt: 0,
      is_liked: false
    });

    // 댓글 더미 데이터
    const dummyComments = [
      { id: 1, text: "첫 번째 댓글입니다!" },
      { id: 2, text: "두 번째 댓글입니다!" }
    ];

    useEffect(() => {
      setComments(dummyComments); // 댓글 초기화
      setDetail({
        comments_cnt: dummyComments.length,
        view_cnt: 100,
        is_liked: false,
        id: id,
        title: "근로 월급이 오늘 들어와서 행복한",
        content: "원래 16일이랬거든요? 근데 오늘 들어와서 너무 행복해졌어용.",
        author: "씨니",
        created_at: "2023-01-01 12:00",
        dummyComments
      }); // 상세 정보 초기화
    }, []);

    // 댓글 렌더링
    const renderComment = () => {
      return comments.length === 0 ? (
        <>작성된 답변이 없습니다.</>
      ) : (
        <>
          <CommunityCommentList
            comments={comments}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            handlePageChange={(page) => setCurrentPage(page)}
            count={comments.length}
            category={"community"}
          />
        </>
      );
    };


    return (
      <S.DetailPageWrapper>
        <S.DetailPageHeaderWrapper>
          <S.DetailPageTitle>Community</S.DetailPageTitle>
            <S.DetailPageSubTitle>어쩌구 커뮤니티에 관한 설명 어쩌구</S.DetailPageSubTitle>
        </S.DetailPageHeaderWrapper>

        <S.DetailContentWrapper>

          <S.DetailDiviner />

          {/* 게시물 제목 */}
          <S.DetailTitle>{detail.title}</S.DetailTitle>

          {/* 게시물 작성자 및 작성일시 */}
          <S.DetailAuthor>
            작성자: {detail.author} 작성 일시: {detail.created_at}
          </S.DetailAuthor>

          {/* 게시물 내용 */}
          <S.DetailContent>
            {detail.content}
          </S.DetailContent>

          <S.DetailDiviner />
          
          <S.DetailViewText>조회수 {detail.view_cnt}</S.DetailViewText>

          {/* 댓글 입력 */}
          <S.DetailCommentHeader>답변 {detail.comments_cnt}</S.DetailCommentHeader>
          <CommentWrite
            id={detail.id}
          />
          {renderComment()}
        </S.DetailContentWrapper>
      </S.DetailPageWrapper>
    );
  }
  
  export default DetailPage;