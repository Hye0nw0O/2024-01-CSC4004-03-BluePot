import { styled } from 'styled-components';
import { GlobalStyle } from './style/globalStyle';
import { Outlet } from 'react-router-dom';
import NavBar from './components/layouts/navbar/NavBar';
import Footer from './components/layouts/footer/Footer';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
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
  return (
    <>
      <GlobalStyle />
      <Layout />
    </>
  );
}

export default App;