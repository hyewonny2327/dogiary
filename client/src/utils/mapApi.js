import axios from 'axios';

export const mapApi = axios.create({
  baseURL: 'http://localhost:8080/api/maps',
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
let cursor = null;
export async function showMyPlaces() {
  try {
    const response = await mapApi.get(`?myMaps=true&cursor=${cursor}`);
    console.log(response.data.data);
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
    console.error('전체 장소 조회하기 api 요청 중 문제 발생', error);
  }
}

export async function showPlacesByTag(tag) {
  try {
    const response = await mapApi.get(`?tag=${tag}`);
    return response;
  } catch (error) {
    console.error('태그별 장소 조회 중 오류 발생', error);
  }
}
