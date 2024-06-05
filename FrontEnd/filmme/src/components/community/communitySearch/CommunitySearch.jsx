import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import searchImage from "../../../assets/images/Main/searchImage.png";

function CommunitySearch({ onSearch }) {
    const [searchWord, setSearchWord] = useState("");
    const changeSearchWord = event => {
        setSearchWord(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <S.CommunitySearchWrapper>
            <S.SearchImage src={searchImage} alt="searchImage" />
            <S.SearchInput
                type="text"
                name="searchWord"
                value={searchWord}
                onChange={changeSearchWord}
                placeholder="검색어를 입력하세요."
            />
            <S.SearchBox />
        </S.CommunitySearchWrapper>
    );
}

export default CommunitySearch;