import React from "react";
import * as S from "./style";
import Comment from "../comment/Comment";

const CommunityCommentList = ({
    comments,
    userInfo,
    // count,
    category,
    fetchComments,
    fetchDetail
    }) => {
        if (!comments || comments.length === 0) {
            return <>작성된 댓글이 없습니다. 첫 댓글을 달아보세요!</>;
        }
        

    // 댓글 데이터를 최신순으로 정렬
    // const sortedComments = commentsContent.slice().reverse();

    return (
        <S.CommunityCommentListWrap>
        <S.CommunityCommentListUl>
            {comments.map((comment, idx) => (
            <Comment
                key={idx}
                id={comment.id}
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
        {/* <S.CommunityCommentListPagingWrap>
            <S.CommunityCommentListPaging>
            <Paging
                page={currentPage}
                count={count}
                postPerPage={itemsPerPage}
                setPage={handlePageChange}
            />
            </S.CommunityCommentListPaging>
        </S.CommunityCommentListPagingWrap> */}
        </S.CommunityCommentListWrap>
    );
};

export default CommunityCommentList;