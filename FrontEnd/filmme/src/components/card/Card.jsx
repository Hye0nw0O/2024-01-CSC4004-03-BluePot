import React, { useEffect } from 'react';
import * as S from './style';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Card(props) {

  useEffect(() => {
    AOS.init({
      duration : 500
    });
  }, []);

  return (
    <>
      <S.CardWrapper data-aos="fade-up"
        to={`/project/${props.id}`}
      >
        <S.CardImg src={props.img} />
        <S.CardContent>
          <S.CardContentInfo>
            <S.CardContentName>{props.name}</S.CardContentName>
            <S.CardContentRegion>{props.region}</S.CardContentRegion>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardContentStar>{props.star}</S.CardContentStar>
            <S.CardContentScore>{props.score}</S.CardContentScore>
          </S.CardContentInfo>
          <S.CardContentInfo>
            <S.CardLikehart>♡</S.CardLikehart>
            <S.CardContentLike>{props.like}</S.CardContentLike>
          </S.CardContentInfo>
        </S.CardContent>
      </S.CardWrapper>
    </>
  );
}

export default Card;