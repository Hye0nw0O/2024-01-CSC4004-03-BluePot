import React from 'react';
import { styled } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/layouts/navbar/NavBar';
import Footer from './components/layouts/footer/Footer';
import router from './router';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
`;

const Layout = () => {
  return (
    <>
      <NavBar />
        <Wrapper>
          <Outlet />
        </Wrapper>
      <Footer />
    </>
  );
};

function App() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup'); // 버튼 클릭 시 /signup 경로로 이동
  };

  return (
    <>
      <GlobalStyle />
      <Layout />
    </>
  );
}

export default App;