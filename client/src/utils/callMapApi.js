import React from 'react';

import { setMarkers } from '../slice/store';

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