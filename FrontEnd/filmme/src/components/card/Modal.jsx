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
        <S.ModalImage src={content.view_url} alt={content.name} /><br/><br/><hr /><br />
                <S.NameRegionContainer>
                    <S.ModalName>{content.name}</S.ModalName>
                    <S.ModalRegion color={content.regionColor}>{content.region}</S.ModalRegion>
                </S.NameRegionContainer><br /><br /><br/>
                <S.tel>☎ Tel. {content.tel}</S.tel><br/><br/>
                <S.tel>📍 {content.location}</S.tel><br/><br/>
                <S.ModalDiscription>{content.discription}</S.ModalDiscription><br /><br /><br />
                <S.ModalURL href={content.cite_url} target="_blank" rel="noopener noreferrer">🎬 영화관 홈페이지 바로가기</S.ModalURL><br/><br/><br/><br/>
                <S.Movie>📽 현재 상영 중인 영화 📽</S.Movie><br/>
                <S.MovieList>
                    {content.movies.map((movie, index) => (
                        <S.MovieListItem key={index}>
                            <S.MoviePoster src={movie.poster_url} /><br/>
                            {movie.name}
                        </S.MovieListItem>
                    ))}
                </S.MovieList><br/><br/><br/>
                <S.Star>영화관 별점 주기</S.Star>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <ReactStars
                        count={5}
                        onChange={newRating => setRating(newRating)}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                    />
                    <S.Starbutton type="button" onClick={handleSaveRating}>저장하기</S.Starbutton>
                </div><br/>
            </S.ModalContent>
        </S.ModalOverlay>
    );
}

export default Modal;