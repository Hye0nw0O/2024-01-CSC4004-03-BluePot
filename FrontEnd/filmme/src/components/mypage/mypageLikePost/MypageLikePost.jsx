import React, { useState, useEffect } from 'react';
import MypageCommon from '../mypageCommon/MypageCommon.jsx';
import LikePostList from './LikePostList.jsx';
import { getLikedPosts } from '../../../apis/api/mypage/mypage.js';

function MypageLikePost() {
    const [posts, setPosts] = useState([]);

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
        <>
            <MypageCommon />
            <LikePostList data={posts} url="/community/post/" />
        </>
    );
}

export default MypageLikePost;
