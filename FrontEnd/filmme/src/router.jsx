import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages/main/Main';
import About from './pages/about/About';
import Community from './pages/community/Community';
import Auths from './pages/auths/Auths';
import Signup from './pages/auths/Signup';
import Mypage from './pages/mypage/Mypage';
import Landing from './pages/landing/Landing';

// 커뮤니티 관련
import DetailPage from "./pages/community/communityDetail/DetailPage";
import CommunityCreatPost from "./pages/community/communityCreatePost/CommunityCreatePost";
import CommunityEdit from "./pages/community/communityEdit/CommunityEdit";

// mypage 관련
import MypageLikeCinema from './components/mypage/mypageLikeCinema/MypageLikeCinema';
import MypageLikePost from './components/mypage/mypageLikePost/MypageLikePost';
import MypageMyComment from './components/mypage/mypageMyComment/MypageMyComment';
import MypageMyPost from './components/mypage/mypageMyPost/MypageMyPost';

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
                path: 'about',
                element: <About />,
            },
            {
                path: 'community',
                element: <Community />,
            },
            {
                path: 'auths',
                element: <Auths />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                path: 'mypage',
                element: <Mypage />,
            },
            {
                path: 'mypage/liked-cinema',
                element: <MypageLikeCinema />
            },
            {
                path: 'mypage/liked-post',
                element: <MypageLikePost />
            },
            {
                path: 'mypage/my-comment',
                element: <MypageMyComment />
            },
            {
                path: 'mypage/my-post',
                element: <MypageMyPost />
            },
            {
                path: 'landing',
                element: <Landing />,
            },
            {
                path: 'community/:type/:id',
                element: <DetailPage />
            },
            {
                path: 'community/create',
                element: <CommunityCreatPost />
            },
            {
                path: 'community/edit/:id',
                element: <CommunityEdit />
            }
        ],
    },
]);

export default router;
