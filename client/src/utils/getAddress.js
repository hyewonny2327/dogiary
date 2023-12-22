import React from 'react';
import axios from 'axios';


export default async function getAddress (lng, lat) {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`, {
      headers: {
        Authorization: 'KakaoAK 5c381a3c01f442cea0fb7b146460b18a',
      },
    });

    const address = response.data.documents[0].address.address_name;
    //console.log('주소 정보', address);
    return address;
  } catch (error) {
    console.error('에러', error);
    return null;
  }
};


