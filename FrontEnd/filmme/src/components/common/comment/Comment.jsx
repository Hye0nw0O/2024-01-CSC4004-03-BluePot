import React, { useState, useEffect } from "react";
import * as S from "./style";

import EditDelete from "../editDelete/EditDelete";
import Modal from "../modal/Modal";

const Comment = ({
  id,
  content,
  isRegist,
  userInfo,
  writer,
  isTemp,
  created_at,
  category,
  fetchComments,
  fetchDetail
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(content);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창
  const [password, setPassword] = useState(""); // 비회원 댓글 삭제 비밀번호
  const [error, setError] = useState("");
  const [isWriterUser, setIsWriterUser] = useState(false);
  const [isfirst, setIsFirst] = useState(true);
  const [comments, setComments] = useState([]); // 댓글 상태

  useEffect(() => {
    // 로컬에서 writer 검증 로직 (임시)
    if (userInfo && writer === userInfo.name) {
      setIsWriterUser(true);
    }
  }, [userInfo, writer]);

  const handlePasswordChange = event => {
    const inputValue = event.target.value;
    if (/^[0-9]*$/.test(inputValue)) {
      setPassword(inputValue);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(content);
  };

  const UserUpdateSubmit = () => {
    alert("댓글이 수정되었습니다.");
    setIsEditing(false);
    // 로컬 상태 업데이트
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: editedComment };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const UserDeleteSubmit = () => {
    setIsModalOpen(true);
  };

  const userCommentOnclick = () => {
    alert("댓글 삭제에 성공했습니다.");
    setIsModalOpen(false);
    // 로컬 상태에서 삭제
    const filteredComments = comments.filter(comment => comment.id !== id);
    setComments(filteredComments);
  };

  const userCommentCommunityOnclick = () => {
    alert("댓글 삭제에 성공했습니다.");
    // 로컬 상태에서 삭제
    const filteredComments = comments.filter(comment => comment.id !== id);
    setComments(filteredComments);
  };

  const nonUserDeleteSubmit = e => {
    e.preventDefault();
    if (password === "1234") { // 가정: 올바른 비밀번호 '1234'
      alert("댓글 삭제에 성공했습니다.");
      const filteredComments = comments.filter(comment => comment.id !== id);
      setComments(filteredComments);
      setPassword("");
    } else {
      setPassword("");
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (userInfo && isRegist) {
    return (
      <>
        {isEditing ? (
          <>
            <S.CommunityCommentFormWriteMy>
              <S.CommunityCommentFormWriteTextArea
                value={editedComment}
                onChange={e => setEditedComment(e.target.value)}
                minLength={10}
                maxLength={300}
              />

              <S.CommunityCommentFormWriteButton
                onClick={UserUpdateSubmit}
              >
                등록
              </S.CommunityCommentFormWriteButton>
            </S.CommunityCommentFormWriteMy>
          </>
        ) : (
          <>
            <S.CommunityCommentMyLi>
              <S.CommunityCommentMyWrap>
                <S.CommunityCommentMyHeader>
                  <S.CommunityCommentMyHeaderWrapper>
                    <S.CommunityCommentMyWriter>
                      {writer}
                    </S.CommunityCommentMyWriter>
                    <S.CommunityCommentMyDate>
                      {created_at}
                    </S.CommunityCommentMyDate>
                  </S.CommunityCommentMyHeaderWrapper>

                  <EditDelete
                    isWriter={true}
                    id={id}
                    isUser={false}
                    handleEdit={handleEdit}
                    handleDelete={UserDeleteSubmit}
                    isBlue={true}
                  />
                </S.CommunityCommentMyHeader>

                <S.CommunityCommentMyContent>
                  {content}
                </S.CommunityCommentMyContent>
              </S.CommunityCommentMyWrap>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={userCommentOnclick}
                content={"정말로 삭제하시겠습니까?"}
              />
            </S.CommunityCommentMyLi>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <S.CommunityCommentListLi>
        <S.CommunityCommentMyWrap>
          <S.CommunityCommentListHeader>
            <S.CommunityCommentListHeaderWrapper>
              <S.CommunityCommentListWriter>
                {writer}
              </S.CommunityCommentListWriter>
              <S.CommunityCommentListDate>
                {created_at}
              </S.CommunityCommentListDate>
            </S.CommunityCommentListHeaderWrapper>

            {category === "community" ? (
              <>
                <EditDelete
                  isWriter={isWriterUser}
                  isUser={!isWriterUser}
                  id={id}
                  handleDelete={userCommentCommunityOnclick}
                />
              </>
            ) : (
              <>
                <EditDelete
                  isWriter={true}
                  isUser={!isTemp}
                  id={id}
                  handleDelete={UserDeleteSubmit}
                />
              </>
            )}
          </S.CommunityCommentListHeader>
          <S.CommunityCommentListContent>
            {content}
          </S.CommunityCommentListContent>
        </S.CommunityCommentMyWrap>

        {!userInfo && (
          <S.CommunityCommentMyButtonNotUser></S.CommunityCommentMyButtonNotUser>
        )}

        <S.NotUserDeleteModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="댓글 삭제 확인"
          ariaHideApp={false}
        >
          <S.NotUserDeleteModalContentWrap>
            <S.NotUserDeleteModalContentTitle>
              비밀번호를 입력하세요
            </S.NotUserDeleteModalContentTitle>

            <S.CommunityCommentCommentFormWrite
              onSubmit={nonUserDeleteSubmit}
            >
              <S.CommunityCommentCommentFormWritePwd
                type="password"
                inputMode="numeric"
                value={password}
                onChange={handlePasswordChange}
                pattern="\d{4}"
                minLength={4}
                maxLength={4}
                title="4자리 숫자로 입력해주세요"
                placeholder="비밀번호 (4자리 숫자)"
                required
              />

              <S.NotUserDeleteModalContentButtonWrap>
                <S.NotUserDeleteModalContentButtonConfirm type="submit">
                  확인
                </S.NotUserDeleteModalContentButtonConfirm>
                <S.NotUserDeleteModalContentButtonCancle
                  onClick={() => setIsModalOpen(false)}
                >
                  취소
                </S.NotUserDeleteModalContentButtonCancle>
              </S.NotUserDeleteModalContentButtonWrap>
            </S.CommunityCommentCommentFormWrite>
          </S.NotUserDeleteModalContentWrap>
        </S.NotUserDeleteModal>
      </S.CommunityCommentListLi>
    </>
  );
};

export default Comment;
