import React, { useState, useEffect } from 'react';
import * as S from './style';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function Card({ id, img, name, region, star, score, like, onClick, onLikeToggle, isLiked }) {
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration : 500
    });
  }, []);

  const handleLikeClick = async (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    e.preventDefault(); // 새로 고침 방지
    if (isLikeButtonDisabled) return; // 버튼이 이미 비활성화되어 있으면 요청을 보내지 않음
    setIsLikeButtonDisabled(true); // 버튼 비활성화
    try {
      const response = await axios.post(`https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/cinemas/like/${id}/`);
      if (response.status === 200) {
        const updatedLikeCount = response.data.like_cnt;
        console.log(updatedLikeCount);
        onLikeToggle(id, updatedLikeCount); // 좋아요 토글 이벤트 호출 및 업데이트된 좋아요 수 전달
      } else {
        console.error("좋아요를 업데이트하는 데 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("서버 요청 중 오류가 발생했습니다:", error);
    } finally {
      setIsLikeButtonDisabled(false); // 요청이 완료되면 버튼 활성화
    }
  };

  return (
    <>
      <S.CardWrapper data-aos="fade-up" onClick={onClick}>
        <S.CardImg src={img} />
        <S.CardContent>
          <S.CardContentInfo>
            <S.CardContentName>{name}</S.CardContentName>
            <S.CardContentRegion region={region}>{region}</S.CardContentRegion>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardContentStar>{star}</S.CardContentStar>
            <S.CardContentScore>({score})</S.CardContentScore>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardLikehart onClick={handleLikeClick} disabled={isLikeButtonDisabled}>{isLiked ? '❤️' : '♡'}</S.CardLikehart>
            <S.CardContentLike>{like}</S.CardContentLike>
          </S.CardContentInfo>
        </S.CardContent>
      </S.CardWrapper>
    </>
  );
}

export default Card;
