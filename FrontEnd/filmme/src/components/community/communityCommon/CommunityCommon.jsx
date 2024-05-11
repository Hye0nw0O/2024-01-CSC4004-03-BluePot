import React, { useEffect, useState } from "react";
import * as S from "./style";
import PostList from "../../common/post/PostList";

function CommunityCommon() {
    const [commonContent, setCommonContent] = useState([]);

    // 현재 페이지
    const [currentPage, setCurrentPage] = useState(1);
    const [init, setInit] = useState(false);

    const [count, setCount] = useState(0);

    const SelectorOption = [
        { value: "recent", title: "최신순" },
        { value: "popular", title: "조회순" },
        { value: "like", title: "좋아요순" }
    ];

    const [currentOption, setCurrentOption] = useState("recent");
    const getCurrentOption = option => {
        setCurrentOption(option);
    };


    const fetchCommonContent = async () => {
        
        const commentContentData = response.data.results;
        setCount(response.data.count);
        
        setCommonContent(commentContentData);
        setInit(true);
    }

    useEffect(() => {
        setCurrentPage(1);
        fetchCommonContent();
        }, [currentOption]);
    
      // 페이지 변경
    useEffect(() => {
        fetchCommonContent();
        }, [currentPage]);

    useEffect(() => {
        const commonData = [
        {
            id: 1,
            title: "가짜데이터",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 2,
            title: "이게 진짜 데이터 같냐?",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 3,
            title: "아니걸랑용~",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 4,
            title: "모라하더라 가짜데이터를",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 176,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 5,
            title: "무튼 가짜데이터임 아직",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 6,
            title: "하아아아아",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 7,
            title: "왜 안 될까 ㅠ",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 8,
            title: "되면 좋겠다 ...",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 9,
            title: "아 더미데이터!! 라 한다 !!",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 10,
            title: "후후",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 11,
            title: "지금 십센치 노래 듣는 중",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 12,
            title: "곧 잔나비 거 들어야지",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        },
        {
            id: 13,
            title: "그러고 자야지..",
            cinema: "에무시네마",
            created_at: "2024/10/24 23:00",
            likes_cnt: 17,
            view_cnt: 100,
            comment_cnt: 5
        }

        // 추가.....
        ];
        setCommonContent(commonData);
    }, []);
    return (
        <>
        <PostList
            use={"communityCommon"}
            category={"common"}
            data={commonContent}
            url={"/community/commons/"}
            writeUrl={"/community/create"}
            currentOption={currentOption}
            SelectorOption={SelectorOption}
            getCurrentOption={getCurrentOption}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            count={count}
        />
        </>
    );
}

export default CommunityCommon;