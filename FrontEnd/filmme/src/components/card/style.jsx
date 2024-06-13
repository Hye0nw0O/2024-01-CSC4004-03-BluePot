import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardWrapper = styled(Link)`
  display: flex;
  max-width: 286px;
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

export const CardContentStar = styled.div`
  font-size: 20px;
  margin-top: 0.5rem;
`;

export const CardContentScore = styled.div`
  margin-left: 0.5rem;
  margin-top: 1.2rem;
  font-size: 12px;
`;

export const CardLikehart = styled.div`
  color: red;
  margin-left: 22rem;
  font-size: 20px;
`;

export const CardContentLike = styled.div`
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  font-size: 14px;
`;

// Modal

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
  border-radius: 10px;
  width: 90vw;
  max-width: 800px;
  height: 90vh;
  max-height: 600px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

export const ModalBody = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #333;
  overflow-y: auto;
`;

export const NameRegionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ModalName = styled.h2`
  font-size: 1.8rem;
  font-family: 'Pretendard-Medium';
  font-weight: bold;
  margin: 0;
`;

export const ModalRegion = styled.p`
  background-color: ${props => props.color || '#AEAFB9'};
  color: #fff;
  padding: 10px 14px;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Pretendard';
  margin: 0;
`;

export const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;
`;

export const ModalDetail = styled.div`
  font-size: 1.5rem;
  color: #555;
`;

export const ModalDiscription = styled.p`
  font-size: 1.5rem;
  font-family: 'Pretendard-Medium';
  margin-bottom: 20px;
`;

export const ModalURL = styled.a`
  font-size: 1.2rem;
  color: #6069E4;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const MovieSection = styled.div`
  margin-bottom: 20px;
`;

export const Movie = styled.h3`
  font-size: 1.2rem;
  font-family: 'Pretendard-Medium';
  font-weight: bold;
  margin-bottom: 10px;
`;

export const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 10px;
`;

export const MovieListItem = styled.li`
  width: 100px;
  text-align: center;
  font-size: 0.9rem;
  font-family: 'Pretendard-Medium';
  font-weight: bold;
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const RatingSection = styled.div`
  margin-bottom: 20px;
`;

export const Star = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Starbutton = styled.button`
  background: ${props => (props.disabled ? '#d3d3d3' : '#161835')};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${props => (props.disabled ? '#d3d3d3' : '#1c86ee')};
  }
`;