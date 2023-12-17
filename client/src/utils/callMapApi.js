import React from 'react';

import { setMarkers } from '../slice/store';

//kakao map api에서 키워드를 기준으로 지도를 불러오는 함수 
export function callMapApi(dispatch,searchInput){

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