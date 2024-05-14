import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import searchImage from "../../../assets/images/Main/searchImage.png";

function CommunitySearch() {

    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState("");
    const changeSearchWord = event => setSearchWord(event.target.value);

    const onSubmit = event => {
        event.preventDefault();
        navigate(`/community-search?q=${searchWord}`);
    };

    return (
        <>
        <S.CommunitySearchWrapper onSubmit={onSubmit}>
            <S.SearchImage src={searchImage} alt="searchImage"/>
                <S.SearchInput
                    type="text"
                    name="searchWord"
                    value={searchWord}
                    onChange={changeSearchWord}
                    placeholder="검색어를 입력해주세요."
                />
                <S.SearchBox/>
        </S.CommunitySearchWrapper>
        </>
    );
}

export default CommunitySearch;