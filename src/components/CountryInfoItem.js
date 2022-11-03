import React from "react";
import { AiOutlineRise } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GiHypodermicTest, GiDeathSkull } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";

const CountryInfoItem = ({ iconType, value, tooltip }) => {
  function renderIcon() {
    switch (iconType) {
      case "all":
        return <AiOutlineRise size={20} />;
      case "crt":
        return <TiWarning size={20} color="yellow" />;
      case "tst":
        return <GiHypodermicTest size={20} />;
      case "act":
        return <BiTimeFive size={20} />;
      case "dth":
        return <GiDeathSkull size={20} color="red" />;
      default:
        return "";
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.2em",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "50%",
          padding: "0.2em",
          alignItems: "center",
        }}
      >
        <div style={{ width: "20%", display: "flex", alignItems: "center" }}>
          {renderIcon(iconType)}
        </div>
        <div
          style={{
            fontSize: "0.8em",
            display: "flex",
            alignItems: "center",
            width: "80%",
            textAlign: "left",
            height: "100%",
          }}
        >
          {tooltip}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "50%",
          fontSize: "0.9em",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default CountryInfoItem;
