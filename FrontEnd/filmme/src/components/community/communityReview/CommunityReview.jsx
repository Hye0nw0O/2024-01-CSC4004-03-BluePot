import React, { useEffect, useState } from "react";
import * as S from "./style";
import PostList from "../../common/post/PostList";

import { getCommunityReview } from '../../../apis/api/community/getCommunityReview';

function CommunityReview() {
    const [reviewContent, setReviewContent] = useState([]);

    useEffect(() => {
        const fetchReviewContent = async () => {
            try {
                const data = await getCommunityReview();
                if (Array.isArray(data)) {
                    console.log("Fetched Data:", data);
                    setReviewContent(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch promotions: ", error);
            }
        };
        fetchReviewContent();
    }, []);

    const [cinemaOption, setcinemaOption] = useState([]);
    const [currentCinemaOption, setCurrentCinemaOption] = useState("");

    const getCurrentCinemaOption = option => {
        setCurrentCinemaOption(option);
        };

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

    // fetchCinemaContent 수정
    // const fetchCinemaContent = async () => {
    //     try {
    //         const response = await axios.get("filmme/all/cinema");
    //         const cinemaData = response.data;
    //         setCinemaOption(cinemaData);
    //         setInit(true);
    //         } catch (e) {}
    //     };

    const fetchReviewContent = async () => {
        
        const reviewContentData = response.data.results;
        setCount(response.data.count);
        setReviewContent(reviewContentData);
    }

    // cinema 선택 옵션
    // useEffect(() => {
    //     fetchCinemaContent();
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
        fetchReviewContent();
        }, [currentOption]);
    
      //페이지변경
    useEffect(() => {
        fetchReviewContent();
        }, [currentPage]);

    return (
        <>
        <PostList
            use={"communityTips"}
            category={"tips"}
            data={reviewContent}
            url={"/community/tips/"}
            writeUrl={"/community/create"}
            currentOption={currentOption}
            currentCinemaOption={currentCinemaOption}
            SelectorOption={SelectorOption}
            cinemaOption={cinemaOption}
            getCurrentOption={getCurrentOption}
            getCurrentCinemaOption={getCurrentCinemaOption}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            count={count}
        />
        </>
    );
}

export default CommunityReview;