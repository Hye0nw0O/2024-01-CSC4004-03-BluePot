import { styled, keyframes } from "styled-components";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MypageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CommunityContentWrapper = styled.div`
    width: 100%;
    max-width: 1178px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin-top: 5.7rem;
    margin-bottom: 10rem;
    background-color: white;
    @media (max-width: 550px) {
        margin-top: 3rem;
    }
`;

export const PostListWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeInAnimation} 0.5s ease-in-out;
  position: relative; 
`;

export const PostListTable = styled.table`
  margin: 0 auto;
  width: 100%;
`;

export const PostListTableThead = styled.thead``;
export const PostListTableTbody = styled.tbody`
  animation: ${fadeInAnimation} 0.5s ease-in-out;
`;

export const PostListTableTr = styled.tr``;
export const PostListTableTh = styled.th`
  font-family: 'Pretendard-Medium';
  padding: 2rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const PostListTableTd = styled.td`
  font-family: 'Pretendard-Medium';
  padding: 2rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #f0f0f0;
  text-align: flex-start;
`;

export const PostListTableTdTitle = styled.td`
  padding: 2rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #f0f0f0;
  text-align: flex-start;
`;

export const PostListTableTrContent = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const LikeIcon = styled(FaRegThumbsUp)`
  color: black;
  font-size: 1.4rem;
  margin-right: 0.5rem;
`;

export const CommentIcon = styled(FaRegCommentAlt)`
  color: black;
  font-size: 1.4rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

export const EyeIcon = styled(FaEye)`
  color: black;
  font-size: 1.4rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

export const PostListPaging = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
  position: relative;
  bottom: 0;
  transform: translate(-50%, 0);
`;

export const StatusText = styled.p`
  font-family: 'Pretendard-Medium';
  color: ${props => props.color};
  font-size: 1.3rem;
`;
