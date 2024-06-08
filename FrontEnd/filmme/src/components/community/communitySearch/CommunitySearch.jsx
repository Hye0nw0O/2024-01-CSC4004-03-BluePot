import React, { useState } from "react";
import * as S from "./style";
import searchImage from "../../../assets/images/Main/searchImage.png";

function CommunitySearch({ onSearch }) {
    const [searchWord, setSearchWord] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const changeSearchWord = event => {
        setSearchWord(event.target.value);
        onSearch(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <S.CommunitySearchWrapper>
            <S.SearchBox>
                <S.SearchImage src={searchImage} alt="searchImage" />
                <S.SearchInput
                    type="text"
                    name="searchWord"
                    value={searchWord}
                    onChange={changeSearchWord}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={isFocused ? '' : '검색어를 입력하세요.'}
                />
            </S.SearchBox>
        </S.CommunitySearchWrapper>
    );
}

export default CommunitySearch;
