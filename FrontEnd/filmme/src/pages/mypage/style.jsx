import styled from "styled-components";

export const MypageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2rem;
`;

export const MypageTitle = styled.div`
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-weight: 700;
    margin-top: 7vw;
`;

export const MypageHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 4rem;
`;

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
`;

export const ProfileName = styled.div`
    display: flex;
    align-items: center;
`;

export const Name = styled.div`
    font-size: 24px;
    color: #161835;
    font-weight: bold;
`;

export const ChangeNameButton = styled.button`
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 12px;
    color: #fff;
    background-color: #6069E4;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const Email = styled.div`
    font-size: 18px;
    color: #161835;
    margin-top: 1.5rem;
`;

export const MyFilmmeRecord = styled.div`
    margin-top: 7rem;
    width: 100%;
    text-align: center;
`;

export const FilmmeRecordTitle = styled.div`
    font-size: 24px;
    color: #161835;
    font-weight: bold;
    margin-bottom: 5rem;
`;

export const HighlightedText = styled.span`
    color: #6069E4;
    font-size: inherit; // 옆에 글자와 같은 크기를 유지
    margin: 0 0.5rem;
`;

export const RecordWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
`;

export const RecordCard = styled.div`
    width: 17rem;
    height: 17rem;
    background-color: #E7E9FB;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #161835;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const MyCinemaRecord = styled.div`
    margin-top: 10rem;
    width: 100%;
    text-align: center;
    max-width: 80rem; 
`;

export const CinemaRecordTitle = styled.div`
    font-size: 24px;
    color: #161835;
    font-weight: bold;
    margin-bottom: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Arrow = styled.span`
    font-size: 24px;
    cursor: pointer;
    margin: 0 1rem;
    &:hover {
        color: #6069E4;
    }
`;

export const CinemaRecordGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr); // 한 주에 7일을 표시
    width: 100%;
    ${(props) => !props.isCurrentMonth && `
        color: #A0A0A0;
    `}
`;

export const CinemaRecordCard = styled.div`
    background-color: ${(props) => props.isCurrentMonth ? '#E7E9FB' : '#f0f0f0'};
    height: 179.036px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start; // 좌측 정렬
    justify-content: flex-start; // 상단 정렬
    padding: 1rem; // 내부 여백 추가
    font-size: 14px;
    color: #161835;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${(props) => props.isCurrentMonth ? '#e0e0e0' : '#dcdcdc'};
    }
`;

export const DayNumber = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;
