import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardWrapper = styled(Link)`
  display: flex;
  width: 286px;
  height: 361px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  margin: 4rem 10rem 3rem 6rem;
  box-shadow: 0px 10px 5px -2px rgba(0, 0, 0, 0.25);
  flex-direction: column;

  &:hover {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const CardImg = styled.img`
  width: 285px;
  height: 258px;
  border-radius: 10px 10px 0px 0px;
`;

export const CardContent = styled.div`
  display: flex;
  padding: 16px 16px 20px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const CardContentInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CardContentName = styled.div`
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: bold;
  line-height: 24px;
  white-space: nowrap;
  width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const CardContentRegion = styled.div`
  display: flex;    
  margin-left: 1.3rem;
  background-color: ${({ region }) => {
    switch (region) {
      case '서울':
        return '#AEAFB9';
      case '인천':
        return 'red';
      case '경기':
        return 'orange';
      case '강원':
        return 'yellow';
      case '대전':
        return '#7FFF00';
      case '세종':
        return 'green';
      case '충남':
        return 'skyblue';
      case '충북':
        return '#00CED1';
      case '광주':
        return 'blue';
      case '전남':
        return '#00008B';
      case '전북':
        return 'purple';
      case '경남':
        return 'pink';
      case '경북':
        return '#8A2BE2';
      case '대구':
        return '#A52A2A';
      case '부산':
        return '#808000';
      case '울산':
        return '#FFB07C';
      case '제주':
        return '#ADD8E6';
      default:
        return '#AEAFB9'; // 기본 색상
    }
  }};
  color: #fff;
  padding: 0px 17px;
  border-radius: 3.28px;
  font-size: 11px;
  font-family: 'Pretendard';
  justify-content: center;
  text-align: center;
  align-items: center;
`;

export const CardContentStar = styled.div `
  font-size: 17px;
  margin-top: 0.5rem;
`;

export const CardContentScore = styled.div `
  margin-left: 0.5rem;
  margin-top: 0.9rem;
`;

export const CardLikehart = styled.div `
  color: red;
  margin-left: 22rem;
`;

export const CardContentLike = styled.div `
  margin-left: 0.5rem;
  font-size: 12px;
`;

//Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 80vw;
  max-width: 750px;
  height: 80vh;
  max-height: 550px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalImageWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const ModalImage = styled.img`
  width: 100%; 
  height: auto; 
  display: block;
  margin: 0 auto; // 중앙 정렬을 위해 추가
`;

export const ModalBody = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #333;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;