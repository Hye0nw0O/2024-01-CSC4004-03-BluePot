import React, { useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";
import MDEditor from "@uiw/react-md-editor";
import * as S from "./style";
import "./EditorStyle.css";
import { createPost, getCinemas } from "../../../apis/api/community/community"; // getCinemas 가져오기
import { useLocation, useNavigate } from "react-router-dom";
import CommunityDetailPageType from "../communityDetailPageType/CommunityDetailPageType";
import ReactStars from "react-rating-stars-component";

function CommunityCreatePost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [cinemaOption, setCinemaOption] = useState([]);
    const [currentCinemaOption, setCurrentCinemaOption] = useState(state.cinema || "");
    const [category, setCategory] = useState(state.category);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("내용을 입력해주세요.");
    const [rating, setRating] = useState(0);
    const [boardColor, setBoardColor] = useState(false);

    useEffect(() => {
        if (state.category) {
            setCategory(state.category);
        }
    }, [state.category]);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const cinemas = await getCinemas();
                setCinemaOption(cinemas);
            } catch (error) {
                console.error("Failed to fetch cinemas:", error);
            }
        };

        fetchCinemas();
    }, []);

    const handleImageUpload = async files => {
        const image = files[0];
        if (image.size >= 3000000) {
            alert("3MB 이상 파일은 업로드가 불가능합니다.");
            return;
        }
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedFormats.includes(image.type)) {
            alert("png, jpg, jpeg 파일이 아닙니다.");
            return;
        }
    };

    const getCurrentCinemaOption = option => {
        setCurrentCinemaOption(option);
    };

    const handleClickWrite = async () => {
        if (category === "tips" && (currentCinemaOption === "▿ 영화관 선택" || currentCinemaOption === "")) {
            alert("후기 게시판은 영화관을 선택하셔야 합니다.");
            return;
        }
        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        // 카테고리 값을 백엔드 요구 형식으로 변환
        const categoryMap = {
            "commons": "common",
            "tips": "cinema_tip",
            "suggestions": "suggestion"
        };
        const backendCategory = categoryMap[category] || "common";

        const postData = {
            category: backendCategory,
            title: title,
            content: value,
            cinema: currentCinemaOption || undefined,
            rating: backendCategory === "cinema_tip" ? rating : null,
            user: 1 // 임시로 user id를 1로 설정
        };

        console.log("Sending post data:", postData); // 요청 데이터 로그 출력

        try {
            const response = await createPost(postData);

            if (response) {
                alert("게시글이 작성되었습니다.");
                navigate("/community");
            } else {
                alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <>
        <S.CommunityContentWrapper>
            <S.CreatePageHeaderWrapper>
                <S.CreatePageTitle>Community</S.CreatePageTitle>
            </S.CreatePageHeaderWrapper>

            <CommunityDetailPageType type={category} cinemaName={null} /> 

            <S.CreatePost>
            {category !== "commons" && (
                <S.SelcetorWrapper>
                <S.Select
                    required
                    name="cinemas"
                    onChange={e => getCurrentCinemaOption(e.target.value)}
                >
                    <S.Option value={null}>▿ 영화관 선택</S.Option>
                    {cinemaOption.map((cinema, index) =>
                        <S.Option key={index} value={cinema.name}>
                            {cinema.name}
                        </S.Option>
                    )}
                </S.Select>
                
                <S.SelcetorDescriptionText>
                    {category === "tips" ? (
                    <strong style={{ color: "#FF5D47", fontSize: "1.5rem" }}>
                        *필수
                    </strong>
                    ) : "*선택"}
                </S.SelcetorDescriptionText>
                </S.SelcetorWrapper>
            )}
            {category === "tips" && (
                <S.RatingWrapper>
                    <ReactStars
                        count={5}
                        onChange={newRating => setRating(newRating)}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                    />
                </S.RatingWrapper>
            )}

            <S.CommunityCreateTitle
                placeholder="제목을 입력해주세요."
                maxLength="100"
                onChange={e => setTitle(e.target.value)}
                value={title}
            />
            <FileDrop
                onDragOver={() => setBoardColor(true)}
                onDragLeave={() => setBoardColor(false)}
                onDrop={files => handleImageUpload(files)}
            >
                <MDEditor
                height={"400px"}
                value={value}
                onChange={setValue}
                preview="edit"
                data-color-mode="light"
                />
            </FileDrop>

            <S.ButtonWrapper>
                <S.CommunityCreateButton onClick={handleClickWrite}>
                업로드
                </S.CommunityCreateButton>
            </S.ButtonWrapper>
            </S.CreatePost>
        </S.CommunityContentWrapper>
        </>
    );
}

export default CommunityCreatePost;
