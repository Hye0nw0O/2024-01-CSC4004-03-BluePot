import React, { useEffect, useState } from "react";
import { FileDrop } from "react-file-drop";
import MDEditor from "@uiw/react-md-editor";

import * as S from "./style";
import "./EditorStyle.css";
import { userState } from "../../../components/common/authState/authState";

import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import CommunityDetailPageType from "../communityDetailPageType/CommunityDetailPageType";

function CommunityCreatePost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [cinemaOption, setCinemaOption] = useState([]);
    const [currentCinemaOption, setCurrentCinemaOption] = useState(state.cinema || "");
    const [category, setCategory] = useState(state.category);
    const [user, setUser] = useRecoilState(userState);
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("내용을 입력해주세요.");
    const [boardColor, setBoardColor] = useState(false);

    useEffect(() => {
        if (state.category) {
            setCategory(state.category);
        }
    }, [state.category]);

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

    const handleClickWrite = () => {
        if (category === "tips" && (currentCinemaOption === "▿ 영화관 선택" || currentCinemaOption === "")) {
            alert("후기 게시판은 영화관을 선택하셔야 합니다.");
            return;
        }
        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }
        alert("게시글이 작성되었습니다.");
        navigate("/community"); // 게시글 작성 후 커뮤니티 페이지로 이동
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
                    {state.cinema && (
                        <S.Option value={state.cinema} selected>
                        {state.cinema}
                        </S.Option>
                    )}
                    {cinemaOption.map((cinema, index) =>
                        state.cinema === cinema.title ? null : (
                        <S.Option key={index} value={cinema.title}>
                            {cinema.title}
                        </S.Option>
                    ))}
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