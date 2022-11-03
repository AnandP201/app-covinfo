import React from "react";

const RiskItem = ({ item, index }) => {
  return (
    <div className="risk_item">
      <div
        style={{
          padding: "0.2em",
          display: "flex",
          alignItems: "center",
          fontSize: "1.5em",
          fontWeight: "500",
          color: "#8b008b",
        }}
      >
        {index + 1}
      </div>
      <div className="ri_main">
        <div>{item.name}</div>
        <div>Reported On : {new Date(item.dor).toDateString()}</div>
        <div>Description : {item.desc} </div>
      </div>
    </div>
  );
};

export default RiskItem;
