import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../myMapPage/markerIcon.svg';
import MapRenderer from './MapRenderer';
import MarkerList from './MarkerList';
import { useDispatch, useSelector } from 'react-redux';
import { setMarkers } from '../../slice/store';

const { kakao } = window;

function MapComponent() {

  //dispatch 로 action 을 보내면 redux 내부로 데이터 이동
  //dispatch(보낼 action함수)
  const dispatch = useDispatch();
  //redux store로부터 데이터를 얻기 위한 api 
  const markers = useSelector((state)=>state.map.markers);
  const searchInput = useSelector((state)=>state.map.searchInput);


  const [info, setInfo] = useState();
  //const [markers, setMarkers] = useState([]);

  useEffect(() => {
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
  }, [dispatch, searchInput]);

  return (
    <div>
      <MapRenderer/>
      
    </div>
  );
}

export default MapComponent;


/**
 * <MarkerList markers={markers} />
 * import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker,MarkerClusterer } from 'react-kakao-maps-sdk';
import markerIcon from '../myMapPage/markerIcon.svg'

const {kakao} = window;

function MapComponent({searchInput}){
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
  
    useEffect(() => {

        console.log('여기는 map component : ', searchInput)
      if (!map) return
      const ps = new kakao.maps.services.Places()
  
      ps.keywordSearch(`${searchInput}`, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
  
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
        }
      })
      console.log(markers)
      
    }, [map,searchInput])

  return (
    <MapStyle>
        <Map id='map'// 로드뷰를 표시할 Container
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
                  src: markerIcon, // 마커이미지의 주소입니다
                  size: {
                    width: 40,
                    height: 40,
                  }, // 마커이미지의 크기입니다
                  
                  
                }}
                onClick={() => setInfo(marker)}
                >
                {info &&info.content === marker.content && (
                    <div style={{color:"#000"}}>{marker.content}</div>
                )}
                </MapMarker>
                
            ))}
        </Map>
        
    </MapStyle>
    
  )
}

export default MapComponent;
 */
const MapStyle = styled.div`


#map{
    position: fixed;
    top: 12vh;
    left: 0;
    width:100vw;
    height:100vh;
    z-index:-10000;
}

`
