import React, { useEffect, useState } from "react";
import * as S from "./style.jsx";
import { getCinemas } from "../../../apis/api/community/community.js";

const MypageRecordModal = ({ isAddMode, selectedDate, records, setRecords, currentRecord, setCurrentRecord, handleSaveRecord, closeModal }) => {
    const [cinemas, setCinemas] = useState([]);
    const dateStr = selectedDate ? new Date(selectedDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) : '';

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getCinemas();
                setCinemas(data);
            } catch (error) {
                console.error("영화관 목록을 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        fetchCinemas();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRecord({ ...currentRecord, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setCurrentRecord({ ...currentRecord, [name]: URL.createObjectURL(files[0]) });
        }
    };

    const handleSave = () => {
        setRecords({ ...records, [selectedDate]: currentRecord });
        handleSaveRecord();
    };

    return (
        <S.ModalOverlay onClick={closeModal}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
                {isAddMode ? (
                    <>
                        <S.ModalTitle>{dateStr}의 기록 추가</S.ModalTitle>
                        <S.ModalLabel>방문하신 영화관은 어디인가요?</S.ModalLabel>
                        <S.ModalSelect name="cinema" value={currentRecord.cinema || ''} onChange={handleInputChange}>
                            <option value="">영화관 선택</option>
                            {cinemas.map((cinema) => (
                                <option key={cinema.id} value={cinema.name}>
                                    {cinema.name}
                                </option>
                            ))}
                        </S.ModalSelect>
                        <S.CinemaFileInputLabel htmlFor="cinemaPhoto">영화관 사진 첨부</S.CinemaFileInputLabel>
                        <S.ModalInput type="file" id="cinemaPhoto" name="cinemaPhoto" onChange={handleFileChange} />
                        {currentRecord.cinemaPhoto && <S.ModalImage src={currentRecord.cinemaPhoto} alt="영화관 사진" />}
                        
                        <S.ModalLabel>관람한 영화가 있다면 무엇인가요?</S.ModalLabel>
                        <S.ModalMovieInput name="movie" value={currentRecord.movie || ''} onChange={handleInputChange} />
                        <S.FileInputLabel htmlFor="moviePhoto">영화 사진 첨부</S.FileInputLabel>
                        <S.ModalInput type="file" id="moviePhoto" name="moviePhoto" onChange={handleFileChange} />
                        {currentRecord.moviePhoto && <S.ModalImage src={currentRecord.moviePhoto} alt="영화 사진" />}
                        
                        <S.ModalLabel>{dateStr}의 경험을 자유롭게 기록해보세요!</S.ModalLabel>
                        <S.ModalTextarea name="experience" value={currentRecord.experience || ''} onChange={handleInputChange} />
                        <S.FileInputLabel htmlFor="experiencePhoto">오늘의 사진 첨부</S.FileInputLabel>
                        <S.ModalInput type="file" id="experiencePhoto" name="experiencePhoto" onChange={handleFileChange} />
                        {currentRecord.experiencePhoto && <S.ModalImage src={currentRecord.experiencePhoto} alt="경험 사진" />}
                        
                        <S.ModalAlertLabel>진실된, 온전한 그날의 기록을 위해 수정 및 삭제는 불가합니다.</S.ModalAlertLabel>
                        <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
                    </>
                ) : (
                    <>
                        <S.ModalTitle>{dateStr}의 기록 보기</S.ModalTitle>
                        <S.ModalContentText>방문한 영화관: {currentRecord.cinema}</S.ModalContentText>
                        {currentRecord.cinemaPhoto && <S.ModalImage src={currentRecord.cinemaPhoto} alt="영화관 사진" />}
                        <S.ModalContentText>관람한 영화: {currentRecord.movie}</S.ModalContentText>
                        {currentRecord.moviePhoto && <S.ModalImage src={currentRecord.moviePhoto} alt="영화 사진" />}
                        <S.ModalContentText>경험: {currentRecord.experience}</S.ModalContentText>
                        {currentRecord.experiencePhoto && <S.ModalImage src={currentRecord.experiencePhoto} alt="경험 사진" />}
                    </>
                )}
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default MypageRecordModal;
