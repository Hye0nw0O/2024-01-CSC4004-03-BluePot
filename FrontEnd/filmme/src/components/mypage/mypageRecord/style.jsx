import styled from "styled-components";

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
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const OnlyThisMonth = styled.div`
    font-size: 12px;
    color: #161835;
    font-weight: bold;
    margin-bottom: 2rem;
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
    height: 150px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1rem;
    font-size: 14px;
    color: #161835;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
    border: 0.5px solid #ddd;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
        background-color: ${(props) => props.isCurrentMonth ? '#e0e0e0' : '#dcdcdc'};
    }
`;

export const DayNumber = styled.div`
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const HighlightedText = styled.span`
    color: #6069E4;
    font-size: inherit;
    margin: 0 0.5rem;
`;

export const AddButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    color: #161835;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: ${(props) => (props.isCurrentMonth ? '#6069E4' : '#161835')};
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: #fff;
    padding: 5rem;
    border-radius: 10px;
    text-align: left;
    width: 500px;
    max-width: 90%;
`;

export const ModalTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 3rem;
    text-align: center;
    color: 161835;
`;

export const ModalLabel = styled.label`
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    display: block;
    color: #161835;
`;

export const ModalAlertLabel = styled.label`
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: block;
    color: #161835;
`;

export const ModalInput = styled.input`
    display: none;
`;

export const ModalMovieInput = styled.input`
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const ModalTextarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const ModalButton = styled.button`
    background-color: #cdcdcd;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin: 1rem auto 0;
    display: block;

    &:hover {
        background-color: #161835;
    }
`;

export const ModalSelect = styled.select`
    width: 30%;
    margin-bottom: 1rem; 
    padding: 0.5rem;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const ModalContentText = styled.p`
    font-size: 16px;
    text-align: left;
`;

export const ModalImage = styled.img`
    width: 20%;
    margin-top: 1rem;
    border-radius: 5px;
`;

export const FileInputLabel = styled.label`
    display: inline-block;
    background-color: #ddd;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1rem;

    &:hover {
        background-color: #161835;
    }
`;

export const CinemaFileInputLabel = styled.label`
    display: inline-block;
    background-color: #ddd;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1rem;
    margin-left: 1rem;

    &:hover {
        background-color: #161835;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

export const OnePhoto = styled.label`
    font-size: 9px;
    font-weight: bold;
    text-align: left;
    display: block;
    color: #cdcdcd;
`;

// 작성 후 모습
export const RecordImage = styled.img`
    width: 80%;
    max-width: 80%;
    margin-top: 1rem;
    border-radius: 5px;
`;

export const ViewContent = styled.div`
    color: #161835;
    text-align: left;
    font-size: 1.5rem;
`;

export const ViewModalTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 3rem;
    text-align: center;
    color: #161835;
`;

export const ViewLabel = styled.label`
    font-size: 13px;
    font-weight: bold;
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    display: block;
    color: #161835;

    background-color: #ddd;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 1rem auto 0;
    width: 30%;
`;

export const ViewModal = styled.div`
`;