import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as S from "./style";

import ThumbIcon from "../../../assets/images/Community/mypageThumb.png";
import ThumbOutlineIcon from "../../../assets/images/Community/thumb_outline.png";
import EyeOutlineIcon from "../../../assets/images/Community/eye_outline.png";

import CommentWrite from "../../../components/common/commentWrite/CommentWrite";
import CommunityCommentList from "../../../components/common/communityCommentList/CommunityCommentList";
import CommunityDetailPageType from "../communityDetailPageType/CommunityDetailPageType";
import CommunityDetailContent from "../../../components/common/communityDetail/CommunityDetailContent";
import Loading from "../../../components/common/loading/Loading";
import { getDetail } from "../../../apis/api/community/getDetail";


function DetailPage() {
  // const [user, setUser] = useRecoilState(userState);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [viewCnt, setViewCnt] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [loading, setLoading] = useState(true);
  const [cinemaName, setcinemaName] = useState("에무시네마");
  const [isWriter, setIsWriter] = useState(false);

  const [likeImage, setLikeImage] = useState(ThumbOutlineIcon);

    // 한 페이지당 보여줄 댓글 수
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const { type, id } = useParams();

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
  
    // detail 정보 설정
    const [detail, setDetail] = useState({
      comments_cnt: 0,
      view_cnt: 0,
      is_liked: false,
      title: "",
      writer: "",
      created_at: "",
      content: ""
  });

  useEffect(() => {
    const fetchDetail = async () => {
        try {
            const categoryMap = {
                commons: 'commons',
                tips: 'tips',
                suggestions: 'suggestions'
            };

            const category = categoryMap[type];
            if (!category) {
                throw new Error(`Unknown category type: ${type}`);
            }

            const data = await getDetail(category, id);
            setDetail(data);
        } catch (error) {
            console.error("Failed to fetch detail: ", error);
        } finally {
            setLoading(false);
        }
    };
    fetchDetail();
}, [type, id]);

    const addComment = (text) => {
      const newComment = {
          id: Math.random(), // 임시 ID 생성
          text: text,
          writer: "익명", // 작성자 정보 (임시로 설정)
          created_at: new Date().toISOString()
      };
      setComments(prevComments => [...prevComments, newComment]);
    };

    const deleteComment = (id) => {
        setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    };

    const handleLikeToggle = async () => {
      if (!user) {
        // 로그인 모달창\
        // 로그인하지 않은 경우 로그인 페이지로 이동
        navigate("/login");
        return;
      }


    try {
      // 좋아요 상태 확인

      const accessToken = user.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };

      // isLiked가 true이면 좋아요 취소, delete 요청보내기
      if (likeImage === ThumbIcon) {
        const response = await API.delete(`communities/${type}/${id}`, {
          headers
        });

        if (response.status === 200) {
          setLikeImage(ThumbOutlineIcon);
        }
      } else {
        const response = await API.post(`communities/${type}/${id}`, null, {
          headers
        });

        if (response.status === 200) {
          setLikeImage(ThumbIcon);
        }
      }
    } catch (error) {}
  };


    // 댓글 렌더링
    const renderComment = () => {
      return comments.length === 0 ? (
        <>작성된 댓글이 없습니다.</>
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

    const renderDetail = () => {
      return !detail ? (
        <>
          <S.DetailTitle>로딩중</S.DetailTitle>
          <S.DetailDiviner />
        </>
      ) : (
        <>
          <CommunityDetailContent
            detail={detail}
            isWriter={isWriter}
            id={detail.id}
            // writer={writer}
            type={"community"}
          />
          <S.DetailDiviner />
          <S.LikeViewWrapper>
            <S.Thumbnailimg src={EyeOutlineIcon} alt="조회수" />
            <S.DetailViewText>{viewCnt}</S.DetailViewText>
            {/* is_liked 여부에 따라 */}
            <S.Thumbnailimg
              src={likeImage}
              alt="좋아요"
              onClick={handleLikeToggle}
            />
            <S.DetailViewText>{detail.likes_cnt}</S.DetailViewText>
          </S.LikeViewWrapper>
        </>
      );
    };

    return (
      <S.DetailPageWrapper>
        {/* <S.DetailPageHeaderWrapper>
          <S.DetailPageTitle>Community</S.DetailPageTitle>
            <S.DetailPageSubTitle>어쩌구 커뮤니티에 관한 설명 어쩌구</S.DetailPageSubTitle>
        </S.DetailPageHeaderWrapper> */}

        <S.DetailContentWrapper>
          <CommunityDetailPageType
          type={type}
          cinemaName={
              type === "tips" || type == "suggestions" ? (cinemaName ? cinemaName : null) : null
            }
          />
          <S.DetailDiviner />

          {renderDetail(isWriter)}

          {/* 댓글 입력 */}
          <S.DetailCommentHeader>댓글 {detail.comments_cnt}</S.DetailCommentHeader>
          <CommentWrite
            addComment={addComment}
          />
          {renderComment()}
        </S.DetailContentWrapper>
      </S.DetailPageWrapper>
    );
  }
  
  export default DetailPage;