import React, { useState } from 'react';
import * as S from './style';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

function Modal({ show, onClose, content, rating, setRating, handleSaveRating }) {

  if (!show) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.ModalImage src={content.view_url} alt={content.name} />
        <S.ModalBody>
          <S.NameRegionContainer>
            <S.ModalName>{content.name}</S.ModalName>
            <S.ModalRegion color={content.regionColor}>{content.region}</S.ModalRegion>
          </S.NameRegionContainer>
          <S.ModalInfo>
            <S.ModalDetail>📞 전화: {content.tel}</S.ModalDetail>
            <S.ModalDetail>📍 주소: {content.location}</S.ModalDetail>
          </S.ModalInfo>
          <S.ModalDiscription>🍀 {content.discription}</S.ModalDiscription>
          <S.ModalURL href={content.cite_url} target="_blank" rel="noopener noreferrer">🎬 영화관 홈페이지 바로가기<br /></S.ModalURL>
          <S.MovieSection>
            <S.Movie>📽 현재 상영 중인 영화 📽</S.Movie>
            <S.MovieList>
              {content.movies.map((movie, index) => (
                <S.MovieListItem key={index}>
                  <S.MoviePoster src={movie.poster_url} alt={movie.name} />
                  {movie.name}
                </S.MovieListItem>
              ))}
            </S.MovieList>
          </S.MovieSection>
          <S.RatingSection>
            <S.Star>영화관 별점 주기</S.Star>
            <S.RatingContainer>
              <ReactStars
                count={5}
                onChange={newRating => setRating(newRating)}
                size={30}
                activeColor="#ffd700"
                isHalf={true}
              />
                <S.Starbutton 
                    type="button" 
                    onClick={handleSaveRating} 
                    disabled={rating < 1} // 별점이 1 이상이어야 활성화
                >저장하기</S.Starbutton>
            </S.RatingContainer>
          </S.RatingSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}

export default Modal;
