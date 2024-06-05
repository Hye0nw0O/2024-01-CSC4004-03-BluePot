import React, { useState, useEffect } from "react";
import * as S from "./style";
import "./style.css";

function Paging({ page, count, postPerPage, setPage }) {
    const pageRangeDisplayed = 5;
    const numPages = Math.max(1, Math.ceil(count / postPerPage));
    const numPagesSection = Math.ceil(numPages / pageRangeDisplayed);
    const [currentPageSection, setCurrentPageSection] = useState(0);

    useEffect(() => {
        if (page > numPages) {
            setPage(numPages);
        } else if (page < 1) {
            setPage(1);
        }
    }, [numPages, page, setPage]);

    if (numPages === 0) return null;

    return (
        <>
        <S.Nav>
            <S.Button
            onClick={() => {
                setCurrentPageSection(currentPageSection - 1);
            }}
            disabled={currentPageSection === 0}
            >
            &lt;
            </S.Button>

            {Array.from({ length: numPages })
            .slice(
                currentPageSection * pageRangeDisplayed,
                (currentPageSection + 1) * pageRangeDisplayed
            )
            .map((_, i) => (
                <S.Button
                key={currentPageSection * pageRangeDisplayed + i + 1}
                onClick={() => {
                    window.scrollTo(0, 0);
                    setPage(currentPageSection * pageRangeDisplayed + i + 1);
                }}
                aria-current={
                    page === currentPageSection * pageRangeDisplayed + i + 1
                    ? "page"
                    : null
                }
                >
                {currentPageSection * pageRangeDisplayed + i + 1}
                </S.Button>
            ))}

            <S.Button
            onClick={() => {
                setCurrentPageSection(currentPageSection + 1);
            }}
            disabled={currentPageSection === numPagesSection - 1}
            >
            &gt;
            </S.Button>
        </S.Nav>
        </>
    );
}

export default Paging;
