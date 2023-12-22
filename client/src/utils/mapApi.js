import axios from 'axios';
const getUserToken = () => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = localStorage.getItem('userToken');
  return userToken;
};

const mapApi = axios.create({
  baseURL: 'http://localhost:8080/api/maps',
  withCredentials: true,
});

mapApi.interceptors.request.use((config) => {
  // 로컬 스토리지에서 토큰을 가져온다.
  const userToken = getUserToken();

  // 토큰이 있다면 헤더에 추가한다.
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  config.headers['Content-Type'] = 'application/json';

  return config;
});

export async function registerMyPlace(placeData) {
  //interceptors 사용하는것처럼 여기서도 try catch 안쓰고 에러처리 할 수 있는 방법은 없는건가 ??
  try {
    await mapApi.post(null, placeData);
  } catch (error) {
    console.error('장소 정보 등록하기 api 요청 중 에러 발생', error);
  }
}

export function modifyMyPlace() {}

export async function deleteMyPlace(id) {
  try {
    await mapApi.delete(`/${id}`);
  } catch (error) {
    console.error('장소 정보 삭제하기 api 요청 중 에러 발생', error);
  }
}
let cursor = '2023-12-22';
let toggle = true;
export async function showMyPlaces() {
  try {
    const response = await mapApi.get(`?myMaps=${toggle}&cursor=${cursor}`);
    console.log(response);
    let placesData = response.data.data;
    return placesData;
  } catch (error) {
    console.error('내장소 호출하기 api 요청 중 오류발생', error);
  }
}

export async function showAllPlaces() {
  try {
    const response = await mapApi.get(null);
    return response;
  } catch (error) {
    console.log('등록된 장소정보없음');
    return;
  }
}

export async function showPlacesByTag(tag) {
  try {
    const response = await mapApi.get(`?tag=${tag}`);
    return response.data.data;
  } catch (error) {
    console.error('태그별 장소 조회 중 오류 발생', error);
  }
}
