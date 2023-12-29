import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slice/store';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy-loaded components
const MainPage = React.lazy(() => import('./pages/MainPage'));
const MyMapPage = React.lazy(() => import('./pages/MapPage/MyMapPage'));
const RegisterPlace = React.lazy(() => import('./pages/MapPage/RegisterPlace'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const JoinPage = React.lazy(() => import('./pages/JoinPage'));
const MyFeed = React.lazy(() => import('./pages/myFeedPage/MyFeed'));
const MyFeedPostPage = React.lazy(
  () => import('./pages/myFeedPage/MyFeedPostPage'),
);
const MyPlacePage = React.lazy(() => import('./pages/MapPage/MyPlacePage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const ProfileUpdatePage = React.lazy(() => import('./pages/ProfileUpdatePage'));
const MyPetPage = React.lazy(() => import('./pages/MyPetPage'));
const FindIdPassword = React.lazy(() => import('./pages/FindIdPassword'));
const SignOut = React.lazy(() => import('./pages/Signout'));
const FirstPage = React.lazy(() => import('./pages/FirstPage'));
const MyDogsPage = React.lazy(() => import('./pages/MyDogs'));

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('userToken'));
  const getUserAuth = () => {
    const tokenExist = localStorage.getItem('userToken');
    setIsAuth(!!tokenExist);
    if (!!tokenExist === false) {
      navigate('/loginPage');
    }
  };

  useEffect(() => {
    getUserAuth();
  }, [pathname]);
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {isAuth && (
            <>
              <Route path="/myFeed" element={<MyFeed />} />
              <Route path="/myFeed/post" element={<MyFeedPostPage />} />
              <Route path="/mapPage" element={<MyMapPage />} />
              <Route path="/mapPage/myPlace" element={<MyPlacePage />} />
              <Route
                path="/mapPage/registerPlace"
                element={<RegisterPlace />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/update" element={<ProfileUpdatePage />} />
              <Route path="/myPet" element={<MyPetPage />} />
              <Route path="/find" element={<FindIdPassword />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/mainPage" element={<FirstPage />} />
              <Route path="/mydogs" element={<MyDogsPage />} />
            </>
          )}
          <Route path="/" element={<MainPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/joinPage" element={<JoinPage />} />
          <Route path="/loading" element={<LoadingSpinner />} />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;
