import React, { useEffect } from 'react';
import * as S from './style';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Card({ id, img, name, region, star, score, like }) {

  useEffect(() => {
    AOS.init({
      duration : 500
    });
  }, []);

  return (
    <>
      <S.CardWrapper data-aos="fade-up"
        to={`/project/${id}`}
      >
        <S.CardImg src={img} />
        <S.CardContent>
          <S.CardContentInfo>
            <S.CardContentName>{name}</S.CardContentName>
            <S.CardContentRegion region={region}>{region}</S.CardContentRegion>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardContentStar>{star}</S.CardContentStar>
            <S.CardContentScore>{score}</S.CardContentScore>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardLikehart>♡</S.CardLikehart>
            <S.CardContentLike>{like}</S.CardContentLike>
          </S.CardContentInfo>
        </S.CardContent>
      </S.CardWrapper>
    </>
  );
}

export default Card;