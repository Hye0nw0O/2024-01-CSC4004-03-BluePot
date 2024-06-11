import React, { useEffect, useState, useRef } from "react";
import { FileDrop } from "react-file-drop";
import * as S from "./style";
import { createPost, getCinemas } from "../../../apis/api/community/community";
import { useLocation, useNavigate } from "react-router-dom";
import CommunityDetailPageType from "../communityDetailPageType/CommunityDetailPageType";
import ReactStars from "react-rating-stars-component";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function CommunityCreatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    const [cinemaOption, setCinemaOption] = useState([]);
    const [currentCinemaOption, setCurrentCinemaOption] = useState(state.cinema || "");
    const [category, setCategory] = useState(state.category || "commons");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [boardColor, setBoardColor] = useState(false);
    const [image, setImage] = useState(null);

    const fileInputRef = useRef(null);
    const quillRef = useRef(null);

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

    useEffect(() => {
        const quill = new Quill(quillRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                    {'indent': '-1'}, {'indent': '+1'}],
                    ['image']
                ],
            },
        });

        quill.on('text-change', () => {
            setContent(quill.root.innerHTML);
        });
    }, []);

    const handleImageUpload = files => {
        const uploadedImage = files[0];
        if (uploadedImage.size >= 3000000) {
            alert("3MB 이상 파일은 업로드가 불가능합니다.");
            return;
        }
        const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedFormats.includes(uploadedImage.type)) {
            alert("png, jpg, jpeg 파일이 아닙니다.");
            return;
        }
        setImage(uploadedImage);
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = event => {
        handleImageUpload(event.target.files);
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

        const categoryMap = {
            "commons": "common",
            "tips": "cinema_tip",
            "suggestions": "suggestion"
        };
        const backendCategory = categoryMap[category] || "common";

        const postData = {
            category: backendCategory,
            title: title,
            content: content,
            cinema: currentCinemaOption || undefined,
            rating: backendCategory === "cinema_tip" ? rating : null,
            user: 1
        };

        console.log("Sending post data:", postData);

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
            
            <div ref={quillRef} style={{ height: '400px' }}></div>

            <FileDrop
                onDragOver={() => setBoardColor(true)}
                onDragLeave={() => setBoardColor(false)}
                onDrop={files => handleImageUpload(files)}
            >
                <S.ImageDropArea onClick={handleImageClick} boardColor={boardColor}>
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="첨부 이미지" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    ) : (
                        "이미지를 여기에 드래그하거나 클릭하여 첨부하세요."
                    )}
                </S.ImageDropArea>
            </FileDrop>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
            />

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
