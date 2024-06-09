import React from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './style.jsx';
import colorcomment from '../../../assets/images/Mypage/colorcomment.svg';
import colorheart from '../../../assets/images/Mypage/colorheart.svg';
import colorthumb from '../../../assets/images/Mypage/colorthumb.svg';
import colorpost from '../../../assets/images/Mypage/colorpost.svg';

function MypageCommon() {
    const location = useLocation();

    let subtitleText = '';
    let subtitleImage = null;

    switch (location.pathname) {
        case '/mypage/liked-cinema':
            subtitleText = '좋아요 한 영화관';
            subtitleImage = colorthumb;
            break;
        case '/mypage/liked-post':
            subtitleText = '좋아요 한 게시물';
            subtitleImage = colorheart;
            break;
        case '/mypage/my-post':
            subtitleText = '작성한 게시물';
            subtitleImage = colorpost;
            break;
        case '/mypage/my-comment':
            subtitleText = '작성한 댓글';
            subtitleImage = colorcomment;
            break;
        default:
            subtitleText = '마이페이지';
            break;
    }

    return (
        <S.MypageWrapper>
            <S.MypageHeaderWrapper>
                <S.MypageTitle>Mypage</S.MypageTitle>
                <S.MypageSubTitle>
                    {subtitleImage && <img src={subtitleImage} alt={subtitleText} />} {subtitleText}
                </S.MypageSubTitle>
            </S.MypageHeaderWrapper>
        </S.MypageWrapper>
    );
}

export default MypageCommon;
