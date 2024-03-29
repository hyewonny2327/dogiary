import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../icons/markerIcon.svg';
import MapRenderer from './MapRenderer';
import MarkerList from './MarkerList';
import { useDispatch, useSelector } from 'react-redux';
import { setMarkers } from '../../slice/store';
import { callMapApi } from '../../utils';

const { kakao } = window;

function MapComponent() {
  //dispatch 로 action 을 보내면 redux 내부로 데이터 이동
  //dispatch(보낼 action함수)
  const dispatch = useDispatch();
  //redux store로부터 데이터를 얻기 위한 api
  const markers = useSelector((state) => state.map.markers);
  const searchInput = useSelector((state) => state.map.searchInput);

  useEffect(() => {
    callMapApi(dispatch, searchInput);
  }, [dispatch, searchInput]);

  return (
    <div>
      <MapRenderer />
    </div>
  );
}

export default MapComponent;

const MapStyle = styled.div`
  #map {
    position: fixed;
    top: 12vh;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -10000;
  }
`;
