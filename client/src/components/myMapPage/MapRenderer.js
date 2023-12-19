import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../icons/markerIcon.svg';
import { useSelector } from 'react-redux';
import { showAllPlaces } from '../../utils/mapApi';

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


  const clickedTag = useSelector((state)=>state.map.tag);
  const [placesData,setPlacesData] = useState([]);

  useEffect(() => {
    // 모든 장소 정보 조회 API 호출 
    // 좌표값만 추출
    showAllPlaces().then((response, index) => {
      const data = response.data.data;
      console.log('현재 태그는:' ,clickedTag)
      console.log(data);
      if (data && data.length > 0) {
        const places = data.map(place => ({
          lat: place.position[1], 
          lng: place.position[0],
          content: place.content,
          tag:place.tag[0],
        }));
        const filteredPlaces = places.filter((item) => {
          // 만약 clickedTag가 'tag4'라면 모든 아이템을 포함 (전체보기)
          if (clickedTag === 'tag4') {
            return true;
          }
          // 그 외의 경우에는 clickedTag와 일치하는 아이템만 포함
          return item.tag === clickedTag;
        });
        console.log(filteredPlaces)
        //const _contents = placesData.map(place => place.content);
        setPlacesData(filteredPlaces);
      } else {
        console.log('장소 데이터가 없습니다.');
      }
    }, [placesData]); 
  }, [clickedTag]);

  const [isOpen, setIsOpen] = useState(Array(placesData.length).fill(false));

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
        {
          placesData.map((place,index)=>(
            <MapMarker 
            key={`marker-${place.content}-${place.lat},${place.lng}`}
            position={{ lat: place.lat, lng: place.lng }}
            image={{
              src: markerIcon,
              size: {
                width: 40,
                height: 40,
              },
            }}
            clickable={true}
            onClick={()=>{
              let updatedIsOpen = [...isOpen];
              updatedIsOpen[index] = !isOpen[index];;
              setIsOpen(updatedIsOpen);
            }}
            style={{
              width: '95px',
              height: '25px'
            }}
          >
            {isOpen[index] && <div style={{ padding: "5px", color: "#000" }}>{place.content}</div>}
          </MapMarker>

          ))
        }

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

const MarkerContent = styled.div`

  
  
    color: #5F5013;
    font-family: Noto Sans KR;
    font-size: 11px;
    font-weight: 700;
    
  
  
`