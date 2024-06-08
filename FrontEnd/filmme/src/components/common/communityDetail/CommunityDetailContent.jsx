import React from "react";
import * as S from "./style";

import EditDelete from "../editDelete/EditDelete";
import { API } from "../../../apis/utils/index";
import { useNavigate } from "react-router-dom";

import ReactMarkdown from 'react-markdown';
import ReactStars from "react-rating-stars-component";


const CommunityDetailContent = ({ detail, isWriter, id, writer, type }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const accessToken = user.accessToken; // 추출한 accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}` // Bearer Token 설정
        };
        if (type == "suggestions") {
          // suggestions/{suggestion_id}
          const response = await API.delete(`suggestions/${id}`, {
            headers
          });

          if (response.status === 204) {
            navigate("/suggestions");
          }
        } else {
          const response = await API.delete(`communities/posts/${id}`, {
            headers
          });

          if (response.status === 204) {
            if (type == "suggestions") {
              navigate("/suggestions");
            }
            navigate("/community");
          }
        }
      } catch (e) {}
    }
  };

  // edit으로 보내기
  const handleEdit = () => {
    navigate(`/community/edit/${id}`, { state: { detail } });
  };

  const markdown = `${detail.content}<!--rehype:style=font-size: 1.8rem;-->`;

  return (
    <>
      <S.DetailTitleWrapper>
        <S.DetailTitle>{detail.title}</S.DetailTitle>
        <EditDelete
          isWriter={isWriter}
          id={id}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isBlue={true}
        />
      </S.DetailTitleWrapper>
      <S.DetailTitleInfoWrapper>
        <S.DetailTitleGrayInfo>작성자 : {detail.writer}</S.DetailTitleGrayInfo>
        <S.DetailTitleGrayInfo>{detail.created_at}</S.DetailTitleGrayInfo>
      </S.DetailTitleInfoWrapper>

      {detail.category === "cinema_tip" && detail.rating !== null && (
        <S.DetailRating>
          <ReactStars
            count={5}
            value={detail.rating}
            size={16} // 별 크기를 조정
            activeColor="#ffd700"
            isHalf={true}
            edit={false}
          />
        </S.DetailRating>
      )}

      <ReactMarkdown className={"markDown"} children={detail.content} />

      {/* <S.DetailContent>
        <div data-color-mode="light">
          <MarkdownPreview source={markdown} />
        </div>
        <S.MarkdownWrapper></S.MarkdownWrapper>
      </S.DetailContent> */}
    </>
  );
};

export default CommunityDetailContent;