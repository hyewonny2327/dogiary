import axios from 'axios';
const getUserToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = localStorage.getItem('userToken');
  return userToken;
};

const diaryApi = axios.create({
  baseURL: 'http://localhost:8080/api/diaries',
  withCredentials: true,
});

diaryApi.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getUserToken();

  // 토큰이 있다면 헤더에 추가한다.
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
});

export async function postMyDiary(postData) {
  try {
    await diaryApi.post(null, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('다이어리 생성하기 api 요청 중 에러 발생', error);
  }
}

export async function deleteMyDiary(id) {
  try {
    await diaryApi.delete(`${id}`);
  } catch (error) {
    console.error('다이어리 삭제하기 api 요청 중 에러 발생', error);
  }
}

export async function showAllDiaries() {
  try {
    const res = await diaryApi.get(null);
    const diaryData = res.data.data;
    return diaryData;
  } catch (error) {
    console.error('모든 다이어리 조회하기 api 요청 중 에러 발생', error);
  }
}

export async function showDailyDiaries(date) {
  try {
    const res = await diaryApi.get(`?createdAt=${date}`);
    const dailyDiary = res.data.data;
    return dailyDiary;
  } catch (error) {
    console.log('일간 다이어리 조회하기 api 요청 중 에러 발생', error);
  }
}
