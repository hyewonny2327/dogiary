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
  return config;
});

export async function registerMyPlace(placeData) {
  try {
    await mapApi.post(null, placeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export async function showMyPlaces(toggle, cursor) {
  if (cursor) {
    cursor = '&cursor=' + cursor;
  } else {
    cursor = '';
  }
  toggle = toggle.toString();
  try {
    const response = await mapApi.get(`?myMaps=${toggle}${cursor}`);
    let placesData = response.data.data;
    return placesData;
  } catch (error) {}
}

export async function showAllPlaces() {
  try {
    const response = await mapApi.get(null);
    return response;
  } catch (error) {
    console.error('등록된 장소정보없음', error);
  }
}

export async function showPlacesByTag(tag) {
  try {
    const response = await mapApi.get(`?tag=${tag}`);
    return response.data.data;
  } catch (error) {}
}
