import React, { useEffect, useState } from "react";
import * as S from "./style";
import PostList from "../../common/post/PostList";
import Loading from "../../common/loading/Loading";

import { getCommunityCommon } from '../../../apis/api/community/getCommunityCommon';

function CommunityCommon() {
    const [commonContent, setCommonContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommonContent = async () => {
            try {
                const data = await getCommunityCommon();
                if (Array.isArray(data)) {
                    console.log("Fetched Data:", data);
                    setCommonContent(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch promotions: ", error);
            }
        };
        fetchCommonContent();
    }, []);
    

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

    useEffect(() => {
        setCurrentPage(1);
        setCommonContent();
        }, [currentOption]);
    
      // 페이지 변경
    useEffect(() => {
        setCommonContent();
        }, [currentPage]);

        return (
            <>
                {/* {loading ? (
                    <Loading />
                ) : ( */}
                    <PostList
                        use={"communityCommons"}
                        category={"commons"}
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
                {/* )} */}
            </>
        );
    }
    

export default CommunityCommon;