import React, { useState, useEffect } from 'react';
import * as S from './style';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

function Card({ id, img, name, region, star, score, like, onClick, onLikeToggle }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 500
    });
  }, []);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLikeButtonDisabled) return;
    setIsLikeButtonDisabled(true);
    try {
      const response = await axios.post(`https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/cinemas/like/${id}/`);
      if (response.status === 200) {
        setLikeCount(prevCount => prevCount + 1); // 좋아요 수 증가
        setIsLiked(true);
      } else {
        console.error("좋아요를 업데이트하는 데 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("서버 요청 중 오류가 발생했습니다:", error);
    } finally {
      setIsLikeButtonDisabled(false);
    }
  };

  return (
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
          <S.CardLikehart onClick={handleLikeClick} disabled={isLikeButtonDisabled}>
            {isLiked ? '❤️' : '♡'}
          </S.CardLikehart>
          <S.CardContentLike>{likeCount}</S.CardContentLike>
        </S.CardContentInfo>
      </S.CardContent>
    </S.CardWrapper>
  );
}

export default Card;
