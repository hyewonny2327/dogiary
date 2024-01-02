import React from 'react';

import { setMarkers } from '../slice/store';
import getAddress from './getAddress';
//kakao map api에서 키워드를 기준으로 지도를 불러오는 함수
//키워드를 받으면 마커를 저장한다.

/**
 * 
 * @param {*} dispatch 
export default function callMapApi(dispatch,searchInput){
  
  const { kakao } = window;
  
  const ps = new kakao.maps.services.Places();
  
  ps.keywordSearch(`${searchInput}`, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const newMarkers = data.map((place) => ({
        position: { lat: place.y, lng: place.x },
        content: place.place_name,
      }));
      dispatch(setMarkers(newMarkers));
    }
  });
}

* @param {*} searchInput 
*/

export default async function callMapApi(dispatch, searchInput) {
  const { kakao } = window;
  const ps = new kakao.maps.services.Places();

  // async/await를 이용하여 비동기 처리
  try {
    const data = await new Promise((resolve, reject) => {
      ps.keywordSearch(`${searchInput}`, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch data: ${status}`));
        }
      });
    });

    // 마커 업데이트
    const newMarkers = data.map((place) => ({
      position: { lat: place.y, lng: place.x },
      content: place.place_name,
    }));
    dispatch(setMarkers(newMarkers));

    // // 마커 정보를 이용하여 주소를 받아오기
    // const addresses = await Promise.all(
    //   newMarkers.map(async (marker) => {
    //     const addressResult = await getAddress(Number(marker.position.lng), Number(marker.position.lat));
    //     return addressResult;
    //   })
    // );

    //return addresses;

    return data;

    // 주소 업데이트
    //setMarkerAddresses(addresses);
    //return addresses;
  } catch (error) {}
}
