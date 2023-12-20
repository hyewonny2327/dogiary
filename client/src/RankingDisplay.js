import React from "react";
import rankingImage from "./foot.png";

function RankingDisplay() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%", opacity: "50%", position: "relative" }}>
      <img src={rankingImage} alt="foot" style={{ height: "80%", marginLeft: "20px" }} />
      <div
        style={{
          position: "absolute",
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
          margin : '20px 0 0 40px',
          top: "0px",
        }}
      >
        1
      </div>
    </div>
  );
}

export default RankingDisplay;

//텍스트를 props로 받아와서 받는다

//key나 인덱스 써서

//유동적으로 변하는 값은 props로 받아온다
