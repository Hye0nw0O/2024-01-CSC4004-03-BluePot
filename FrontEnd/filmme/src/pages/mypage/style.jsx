import styled from "styled-components";

export const MypageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

// 상단
export const MypageHeaderWrapper = styled.div`
    display: flex;
    // flex-direction: flex;
    margin-right: 60vw;
    gap: 21px;
    margin-top: 3rem;
`;

export const MypageTitle = styled.div `
    font-family: Jalnan;
    font-size: 40px;
    color: #161835;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    width: 100%;
    margin-top: 7vw;
`;

export const MypageSubTitle = styled.div `
    font-family: Pretendard-Medium;
    width: 140%;
    font-size: 13px;
    font-style: normal;

    color: #161835;
`;

export const ProfileImage = styled.img`
    width: 40%;
    height: 40%;
    // margin-top: 3rem;
`;

export const Profile = styled.div`
    padding: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
`;

export const ProfileName = styled.div`

`;

export const Name = styled.div`
    font-size: 2rem;
    color: #6069E4;
    font-family: Pretendard;

    font-style: normal;
    line-height: normal;
`;

export const ChangeNameButton = styled.div`
    fill: #161835;
    stroke-width: 1px;
    stroke: #161835;
    width: 81px;
    height: 23px;
    flex-shrink: 0;
`;

export const Email = styled.div`
    font-size: 2rem;
    color: #6069E4;
    font-family: Pretendard;

    font-style: normal;
    line-height: normal;
`;

// 필름미 활동 기록
export const MyFilmmeRecord = styled.div`
`;

export const FilmmeRecordTitle = styled.div`

`;

export const Record = styled.div`
`;

// 영화 기록
export const MyCinemaRecord = styled.div`
`;