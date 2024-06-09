import React, { useState, useEffect } from 'react';
import * as S from './style';
import Likes from '../../../assets/images/Community/thumb.svg';
import EyeOutlineIcon from '../../../assets/images/Community/eye_outline.png';
import { useNavigate } from 'react-router-dom';
import { getLikedPosts } from '../../../apis/api/mypage/mypage';

const LikePostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const data = await getLikedPosts();
                setPosts(data);
            } catch (error) {
                console.error("좋아요 한 게시물을 가져오는 중 오류가 발생했습니다!", error);
            }
        };

        fetchLikedPosts();
    }, []);

    return (
        <S.CommunityWrapper>
            <S.CommunityContentWrapper>
                <S.PostListWrap>
                    <S.PostListTable>
                        <S.PostListTableThead>
                            <S.PostListTableTr>
                                <S.PostListTableTh>번호</S.PostListTableTh>
                                <S.PostListTableTh>카테고리</S.PostListTableTh>
                                <S.PostListTableTh>제목</S.PostListTableTh>
                                <S.PostListTableTh>등록일시</S.PostListTableTh>
                                <S.PostListTableTh>좋아요</S.PostListTableTh>
                                <S.PostListTableTh>조회수</S.PostListTableTh>
                            </S.PostListTableTr>
                        </S.PostListTableThead>
                        <S.PostListTableTbody>
                            {posts.length > 0 ? (
                                posts.map((post, idx) => (
                                    <S.PostListTableTrContent
                                        key={post.id}
                                        onClick={() => navigate(`/community/post/${post.id}`)}
                                    >
                                        <S.PostListTableTd>{idx + 1}</S.PostListTableTd>
                                        <S.PostListTableTd>{post.category === 'commons' ? '자유' : '영화관 후기'}</S.PostListTableTd>
                                        <S.PostListTableTdTitle>{post.title}</S.PostListTableTdTitle>
                                        <S.PostListTableTd>{post.created_at?.split(" ")[0]}</S.PostListTableTd>
                                        <S.PostListTableTd>
                                            <img src={Likes} alt="좋아요수" style={{ width: '16px', height: '16px' }} />{post.likes_cnt}
                                        </S.PostListTableTd>
                                        <S.PostListTableTd>
                                            <img src={EyeOutlineIcon} alt="조회수" style={{ width: '16px', height: '16px' }} />{post.view_cnt}
                                        </S.PostListTableTd>
                                    </S.PostListTableTrContent>
                                ))
                            ) : (
                                <S.PostListTableTr>
                                    <S.PostListTableTd colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                                        좋아요 한 게시물이 없습니다.
                                    </S.PostListTableTd>
                                </S.PostListTableTr>
                            )}
                        </S.PostListTableTbody>
                    </S.PostListTable>
                </S.PostListWrap>
            </S.CommunityContentWrapper>
        </S.CommunityWrapper>
    );
};

export default LikePostList;