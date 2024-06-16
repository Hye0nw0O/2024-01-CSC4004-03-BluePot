import React, { useEffect } from 'react';
import * as S from "./style";
import AOS from 'aos';
import 'aos/dist/aos.css';

import ys from './박영신.png';
import ch from './박채현.png';
import hw from './안현우.png';
import hj from './이형준.png';
import ws from './최우섭.png';


const About = () => {
  
  useEffect(() => {
    AOS.init();
  }, []);

  return (
<>
      {<S.Container>
        <S.ContainerTop data-aos="fade-up">
          <S.AboutContainer>
            <S.IntroduceFilmme>
              Welcome to FILMME
            </S.IntroduceFilmme>
            <S.IntroduceSloganKr>
              전국의 <S.IntroduceSloganKrBlue as="span">독립예술영화관</S.IntroduceSloganKrBlue> 집약 서비스
            </S.IntroduceSloganKr>
          </S.AboutContainer>
          <S.line>
          </S.line>
          <S.IntroduceTextFirst>
            전국 곳곳에 존재하는 독립예술영화관 <br /> <br />
            정보를 모아서 보고 싶은데, 다른 사람들과 소통하고 싶은데, 또는 내 영화관 경험을 기록하고 싶은데 <br />
            서비스의 부재로 어렵진 않으셨나요? <br /><br />
            저희 필름미(FILM'E)에서 모두 경험해보세요 !
          </S.IntroduceTextFirst>
        </S.ContainerTop>
        <S.ContainerBottom>
          <S.IntroDevsContainerTop data-aos="fade-up">
            <S.IntroDevsTitleText>
              필름미 개발자
            </S.IntroDevsTitleText>
            <S.IntroDevsText>
              필름미를 개발한 사람들을 소개합니다!
            </S.IntroDevsText>
          </S.IntroDevsContainerTop>
          <S.IntroDevsContainerBottom>
            <S.IntroDevsContainerBottomBody>
              <S.IntroDevsSubTitleText data-aos="fade-up">
                Designer & FrontEnd
              </S.IntroDevsSubTitleText>
              <S.IntroDevsDetailContainer>
                <S.IntroImg data-aos="fade-up" src={ys} alt="박영신" />
                <S.IntroImg data-aos="fade-up" src={ch} alt="박채현" />
              </S.IntroDevsDetailContainer>
            </S.IntroDevsContainerBottomBody>
            <S.IntroDevsContainerBottomBody>
              <S.IntroDevsSubTitleText data-aos="fade-up">
                BackEnd
              </S.IntroDevsSubTitleText>
              <S.IntroDevsDetailContainer>
                <S.IntroImg data-aos="fade-up" src={hw} alt="안현우" />
                <S.IntroImg data-aos="fade-up" src={hj} alt="이형준" />
                <S.IntroImg data-aos="fade-up" src={ws} alt="최우섭" />
              </S.IntroDevsDetailContainer>
            </S.IntroDevsContainerBottomBody>
          </S.IntroDevsContainerBottom>
        </S.ContainerBottom>
      </S.Container>
  }
    </>
  );
};
export default About;