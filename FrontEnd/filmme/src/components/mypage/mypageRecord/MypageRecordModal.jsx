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

    const handleDeleteFile = (name) => {
        setCurrentRecord({ ...currentRecord, [name]: null });
    };

    const handleSave = () => {
        const updatedRecords = { ...records, [selectedDate]: currentRecord };
        setRecords(updatedRecords);
        handleSaveRecord(updatedRecords);
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
                        
                        <S.ModalLabel>관람한 영화가 있다면 무엇인가요?</S.ModalLabel>
                        <S.ModalMovieInput name="movie" value={currentRecord.movie || ''} onChange={handleInputChange} />
                        
                        <S.ModalLabel>{dateStr}의 경험을 자유롭게 기록해보세요!</S.ModalLabel>
                        <S.ModalTextarea name="experience" value={currentRecord.experience || ''} onChange={handleInputChange} />
                        {currentRecord.recordPhoto ? (
                            <>
                                <S.ModalImage src={currentRecord.recordPhoto} alt="기록 사진" />
                                {/* <S.ButtonGroup> */}
                                    <S.CinemaFileInputLabel onClick={() => handleDeleteFile("recordPhoto")}>삭제</S.CinemaFileInputLabel>
                                    <S.CinemaFileInputLabel htmlFor="recordPhoto">수정</S.CinemaFileInputLabel>
                                {/* </S.ButtonGroup> */}
                                <S.ModalInput type="file" id="recordPhoto" name="recordPhoto" onChange={handleFileChange} style={{ display: 'none' }} />
                            </>
                        ) : (
                            <>
                                <S.FileInputLabel htmlFor="recordPhoto">오늘의 사진 첨부</S.FileInputLabel>
                                <S.OnePhoto>*사진은 1장만 가능합니다.</S.OnePhoto>
                                <S.ModalInput type="file" id="recordPhoto" name="recordPhoto" onChange={handleFileChange} />
                            </>
                        )}
                        
                        <S.ModalAlertLabel>진실된, 온전한 그날의 기록을 위해 수정 및 삭제는 불가합니다.</S.ModalAlertLabel>
                        <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
                    </>
                ) : (
                    <>
                        <S.ViewModalTitle>나의 {dateStr} 기록</S.ViewModalTitle>
                        {currentRecord.recordPhoto && <S.RecordImage src={currentRecord.recordPhoto} alt="기록 사진" />}
                        <S.ViewModal>
                            <S.ViewLabel>📽️ 오늘의 영화관</S.ViewLabel>
                            <S.ViewContentButton>{currentRecord.cinema}</S.ViewContentButton>
                            <S.ViewLabel>🎬 오늘의 영화</S.ViewLabel>
                            <S.ViewContent>{currentRecord.movie}</S.ViewContent>
                            <S.ViewLabel>😶 오늘의 소감</S.ViewLabel>
                            <S.ViewContent>{currentRecord.experience}</S.ViewContent>
                        </S.ViewModal>
                    </>
                )}
            </S.ModalContent>
        </S.ModalOverlay>
    );
};

export default MypageRecordModal;
