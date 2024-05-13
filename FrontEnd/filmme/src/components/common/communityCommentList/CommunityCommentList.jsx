import React from "react";
import * as S from "./style";
import Paging from "../paging/Paging";
import Comment from "../comment/Comment";

const CommunityCommentList = ({
    comments,
    itemsPerPage,
    currentPage,
    handlePageChange,
    userInfo,
    count,
    category,
    fetchComments,
    fetchDetail
    }) => {
    // 댓글 내용 부분만 추출
    const commentsContent = comments.results;

    if (!commentsContent) {
        return <>작성된 댓글이 없습니다. 첫 댓글을 달아보세요!</>;
    }

    // 댓글 데이터를 최신순으로 정렬
    // const sortedComments = commentsContent.slice().reverse();

    return (
        <S.CommunityCommentListWrap>
        <S.CommunityCommentListUl>
            {commentsContent.map((comment, idx) => (
            <Comment
                key={idx}
                id={comment.id}
                isTemp={comment.is_tmp}
                content={comment.content}
                writer={comment.writer}
                created_at={comment.created_at}
                userInfo={userInfo}
                category={category}
                fetchComments={fetchComments}
                fetchDetail={fetchDetail}
            />
            ))}
        </S.CommunityCommentListUl>
        <S.CommunityCommentListPagingWrap>
            <S.CommunityCommentListPaging>
            <Paging
                page={currentPage}
                count={count}
                postPerPage={itemsPerPage}
                setPage={handlePageChange}
            />
            </S.CommunityCommentListPaging>
        </S.CommunityCommentListPagingWrap>
        </S.CommunityCommentListWrap>
    );
};

export default CommunityCommentList;