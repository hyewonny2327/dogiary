import logo from './logo.svg';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyMapPage from './pages/MyMapPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}/>
      <Route path='/mapPage' element={<MyMapPage/>}/>
      <Route path='/LoginPage' element={<LoginPage/>}/>
      <Route path='/JoinPage' element={<JoinPage/>}/>
    </Routes>
  );
}

export default App;
