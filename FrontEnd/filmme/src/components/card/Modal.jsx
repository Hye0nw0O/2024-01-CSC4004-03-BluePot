import React, { useState } from 'react';
import * as S from './style';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

function Modal({ show, onClose, content, imageUrl, imageAlt, rating, setRating, handleSaveRating }) {

  

  if (!show) {
    return null;
  }

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>X</S.CloseButton>
        <S.ModalImage src={content.view_url} alt={content.name} /><hr /><br /><br />
                <S.NameRegionContainer>
                    <S.ModalName>{content.name}</S.ModalName>
                    <S.ModalRegion color={content.regionColor}>{content.location}</S.ModalRegion>
                </S.NameRegionContainer><br /><br />
                <S.ModalDescription>{content.discription}</S.ModalDescription><br /><br /><br />
                <S.ModalURL href={content.cite_url} target="_blank" rel="noopener noreferrer">🎬 영화관 홈페이지 바로가기</S.ModalURL><br/><br/><br/><br/>
                <S.Movie>📽 현재 상영 중인 영화 📽</S.Movie><br/>
                <S.MovieList>
                    {content.movies.map((movie, index) => (
                        <S.MovieListItem key={index}>
                            <S.MoviePoster src={movie.poster_url} /><br/>
                            {movie.name}
                        </S.MovieListItem>
                    ))}
                </S.MovieList><br/><br/>
                영화관 별점 주기<br/>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ReactStars
                        count={5}
                        onChange={newRating => setRating(newRating)}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                    />
                    <button type="button" onClick={handleSaveRating}>저장하기</button>
                </div>
            </S.ModalContent>
        </S.ModalOverlay>
    );
}

export default Modal;