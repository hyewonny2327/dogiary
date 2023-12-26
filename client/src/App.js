import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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
const ProfileUpdatePage = React.lazy(
  () => import('./components/myProfilePage/ProfileUpdatePage'),
);
const MyPetPage = React.lazy(() => import('./pages/MyPetPage'));
const FindIdPassword = React.lazy(() => import('./pages/FindIdPassword'));
const SignOut = React.lazy(() => import('./pages/Signout'));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mapPage" element={<MyMapPage />} />
          <Route path="/mapPage/myPlace" element={<MyPlacePage />} />
          <Route path="/mapPage/registerPlace" element={<RegisterPlace />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/JoinPage" element={<JoinPage />} />
          <Route path="/myFeed" element={<MyFeed />} />
          <Route path="/myFeed/post" element={<MyFeedPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/update" element={<ProfileUpdatePage />} />
          <Route path="/myPet" element={<MyPetPage />} />
          <Route path="/find" element={<FindIdPassword />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </Suspense>
    </Provider>
  );
}

export default App;
