import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyMapPage from './pages/MapPage/MyMapPage';
import RegisterPlace from './pages/MapPage/RegisterPlace';
import { Provider } from 'react-redux';
import store from './slice/store';
function App() {
  return (
    //provider로 컴포넌트를 감싸주어야 그 속의 컴포넌트들이 state에 접근할 수 있음
    <Provider store={store}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/mapPage' element={<MyMapPage />} />
          <Route path='/registerPlace' element={<RegisterPlace />} />
        </Routes>
    </Provider>
  );
}

export default App;
