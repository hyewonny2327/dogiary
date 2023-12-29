import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useAuth() {
  const { pathname } = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  function getUserAuth() {
    const tokenExist = localStorage.getItem('userToken');
    if (tokenExist !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    if (isAuth === false) {
      console.log('isAuth', isAuth);
      navigate('/loginPage');
    } else {
      setIsAuth(true);
    }
  }
  useEffect(() => {
    //페이지 이동시 로직 실행
    //토큰 유무 조사
    console.log(pathname);
    if (pathname) {
      getUserAuth();
    }
  }, [pathname, isAuth]);
  return isAuth;
}
