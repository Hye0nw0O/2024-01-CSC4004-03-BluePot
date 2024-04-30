import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/main/Main';
import About from './pages/about/About';
import Community from './pages/community/Community';
import Auths from './pages/auths/Auths';
import Mypage from './pages/mypage/Mypage';
import Landing from './pages/landing/Landing';

const router = createBrowserRouter([
    {
    path: '/',
    element: <App />,
    children: [
        {
            path: '',
            element: <Main />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/community',
            element: <Community />,
        },
        {
            path: '/auths',
            element: <Auths />,
        },
        {
            path: '/mypage',
            element: <Mypage />,
        },
        {
            path: '/landing',
            element: <Landing />,
        },
        ],
    },
]);

export default router;