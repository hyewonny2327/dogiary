import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../icons/markerIcon.svg';
import { useSelector } from 'react-redux';
import { showAllPlaces, showPlacesByTag } from '../../utils/mapApi';
const { kakao } = window;

function MapRenderer() {
  const markers = useSelector((state) => state.map.markers);
  const [map, setMap] = useState();
  const [isMarkerClicked, setIsMarkerClicked] = useState([]);
  const clickedTag = useSelector((state) => state.map.tag);

  //태그가 바뀔때마다 api 호출
  //! 12/26 코드리뷰 중복되는 로직 function으로 묶어서 처리하기
  useEffect(() => {
    if (clickedTag === 'tag4') {
      fetchShowAllPlaces();
      return;
    } else {
      console.log(clickedTag);

      showPlacesByTag(clickedTag)
        .then((placesData) => {
          console.log('데이터 확인', placesData);
          if (!placesData) {
            // 데이터가 없을 때의 처리
            console.log('No data available');
            setPositions([]);
            setTitles([]);
            return;
          }
          const _positions = placesData.map((place) => ({
            lat: place.position[1],
            lng: place.position[0],
          }));
          const _titles = placesData.map((place) => place.title);
          setPositions(_positions);
          setTitles(_titles);
          setIsMarkerClicked(Array(_positions.length).fill(false));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [clickedTag]);

  useEffect(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(
        new kakao.maps.LatLng(marker.position.lat, marker.position.lng),
      );
    });

    map.setBounds(bounds);
  }, [map, markers]);

  const [positions, setPositions] = useState([]);
  const [titles, setTitles] = useState([]);

  function fetchShowAllPlaces() {
    showAllPlaces()
      .then((response) => {
        const placesData = response.data.data;
        if (!placesData) {
          return;
        }
        console.log(placesData);
        const _positions = placesData.map((place) => ({
          lat: place.position[1],
          lng: place.position[0],
        }));
        const _titles = placesData.map((place) => place.title);
        setPositions(_positions);
        setTitles(_titles);
        setIsMarkerClicked(Array(_positions.length).fill(false));
      })
      .catch((error) => {});
  }

  //마커 클릭하면 장소이름 보여주기

  function handleMarkerClick(index) {
    setIsMarkerClicked((prevState) => {
      const updatedMarkers = [...prevState];
      updatedMarkers[index] = !updatedMarkers[index];
      return updatedMarkers;
    });
  }

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
        {positions.map((position, index) => (
          <MapMarker
            key={`marker-${titles[index]}-${position.lat},${position.lng}-${index}`}
            position={{ lat: position.lat, lng: position.lng }}
            image={{
              src: markerIcon,
              size: {
                width: 40,
                height: 40,
              },
            }}
            onClick={() => handleMarkerClick(index)}
          >
            {isMarkerClicked[index] && <div>{titles[index]}</div>}
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
`;
