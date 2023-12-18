import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function MarkerList() {
  const markers = useSelector((state)=>state.map.markers);

  return (
    <MarkerListStyle>
      <ul>
        {markers.map((marker, index) => (
          <li key={index}>{marker.content}</li>
        ))}
      </ul>
    </MarkerListStyle>
  );
}

export default MarkerList;

const MarkerListStyle = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 8px;
  }
`;
