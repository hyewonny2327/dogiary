import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../myMapPage/markerIcon.svg';
import { useSelector } from 'react-redux';

const { kakao } = window;

function MapRenderer() {
  const markers = useSelector((state)=>state.map.markers);
  const [map, setMap] = useState();

  useEffect(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
    });

    map.setBounds(bounds);
  }, [map, markers]);

  return (
    <MapStyle>
      <Map
        id="map"
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            image={{
              src: markerIcon,
              size: {
                width: 40,
                height: 40,
              },
            }}
          >
            {marker.content}
          </MapMarker>
        ))}
      </Map>
    </MapStyle>
  );
}

export default MapRenderer;

const MapStyle = styled.div`
  #map {
    position: fixed;
    top: 12vh;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -10000;
  }
`