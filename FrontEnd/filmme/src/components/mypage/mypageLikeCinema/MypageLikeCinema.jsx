import React, { useState, useEffect } from 'react';
import * as S from './style.jsx';
import MypageCommon from '../mypageCommon/MypageCommon.jsx';
import Card from '../../card/Card.jsx';
import Modal from '../../card/Modal.jsx';
import { getCinemas } from '../../../apis/api/mypage/mypage.js';

function MypageLikeCinema() {
    const [theaters, setTheaters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getCinemas();
                setTheaters(data);
            } catch (error) {
                console.error("좋아요 한 영화관 정보를 가져오는 중 오류가 발생했습니다!", error);
            }
        };

        fetchCinemas();
    }, []);

    const handleCardClick = (theater) => {
        setModalContent(
            <div>
                <img style={{ width: '700px', height: '250px' }} src={theater.view_url} alt={theater.name} /><hr/><br/><br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '35px', fontFamily: 'Pretendard-Medium', fontWeight: 'bold' }}>{theater.name}</h2>
                    <p style={{ display: 'flex', marginLeft: '1.3rem', backgroundColor: '#AEAFB9', color: '#fff', padding: '10px 14px', borderRadius: '3.28px', fontSize: '11px', fontFamily: 'Pretendard', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>{theater.location}</p>
                </div><br/><br/>
                <p style={{ fontSize: '20px', fontFamily: 'Pretendard-Medium' }}>{theater.description}</p><br/><br/><br/>
                <a href={theater.cite_url} style={{ fontSize: '15px' }} target="_blank" rel="noopener noreferrer">🎬 영화관 홈페이지 바로가기</a>
            </div>
        );
        setShowModal(true);
    };

    const ViewTheater = () => {
        return theaters.map(theater => (
            <Card
                key={theater.id}
                id={theater.id}
                name={theater.name}
                region={theater.location}
                star={theater.score}
                score={theater.star}
                like={theater.like_cnt}
                img={theater.view_url}
                onClick={() => handleCardClick(theater)}
            />
        ));
    };

    return (
        <>
            <MypageCommon />
            <S.TheaterWrapper>
                <S.TheaterContainer>
                    {ViewTheater()}
                </S.TheaterContainer>
            </S.TheaterWrapper>
            <Modal show={showModal} onClose={() => setShowModal(false)} content={modalContent} />
        </>
    );
}

export default MypageLikeCinema;
