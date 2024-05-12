import React, { useState } from "react";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
// import { userState } from "../../../authState/authState";
// import { useRecoilState } from "recoil";
// import axios from "../../../api/axios";

function CommentWrite({ isUser, id, fetchDetail, fetchComments, addComment }) {
    // const [userInfo, setUserInfo] = useRecoilState(userState);
    // const navigate = useNavigate();
    const [content, setContent] = useState("");

    const sumbitComment = e => {
        // if (content === "") {
        // alert("댓글을 입력해주세요.");
        // return;
        // }
            e.preventDefault();
            if (content.trim() === "") {
                alert("댓글을 입력해주세요.");
                return;
            }
            addComment(content);  // 부모 컴포넌트에서 전달받은 함수를 사용
            setContent("");       // 입력 필드 초기화
            alert("댓글이 등록되었습니다.");
        };

        // 댓글 등록
        // try {
        // // header
        // const accessToken = userInfo.accessToken; // 추출한 accessToken
        // const headers = {
        //     Authorization: `Bearer ${accessToken}` // Bearer Token 설정
        // };

    //     const response = await post(
    //         {
    //         content: content
    //         },
    //         {
    //         headers
    //         }
    //     );
        
    //     if (response.status === 200) {
    //         setContent("");
    //         fetchDetail();
    //         fetchComments();
    //     }
    //     } catch (err) {}
    // };

        // 댓글 등록 로컬용
        // console.log("댓글 등록: ", content);
        // setContent("");
        // alert("댓글이 등록되었습니다.");
        // fetchComments();  // 댓글 목록 갱신을 위해 fetchComments 호출


    // return !userInfo ? (
    //     <>
    //     <S.DetailCommentInputWrapper
    //         onClick={() => {
    //         navigate("/login");
    //         }}
    //     >
    //         <S.DetailCommentInput
    //             placeholder="커뮤니티는 로그인 후 댓글을 작성할 수 있습니다."
    //             disabled
    //         />
    //         <S.DetailCommentButton>로그인</S.DetailCommentButton>
    //     </S.DetailCommentInputWrapper>
    //     </>
    // ) : (
    return (
        <>
        <S.DetailCommentInputWrapper>
            <S.DetailCommentInput
            placeholder="댓글을 작성해보세요!"
            onChange={e => setContent(e.target.value)}
            required
            value={content}
            />
            <S.DetailCommentButton onClick={sumbitComment}>
            등록
            </S.DetailCommentButton>
        </S.DetailCommentInputWrapper>
        </>
    );
}

export default CommentWrite;