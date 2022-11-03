import React from "react";

const CountryItem = ({ item }) => {
  function render(c) {
    switch (c) {
      case "UK":
        return "United Kingdom";
      case "UAE":
        return "United Arab Emirates";
      case "Syria":
        return "Sy";
      case "Russia":
        return "Ru";
      case "S. Korea":
        return "Kor";
      default:
        return c;
    }
  }

  const isPhone = window.matchMedia("(max-width : 480px)").matches;
  return (
    <div className="country_card">
      <img
        style={{
          height: `${isPhone ? "40px" : "50px"}`,
          width: `${isPhone ? "60px" : "80px"}`,
          boxShadow: "1px 1px 2px black rgba(0,0,0,0.65)",
          fontSize: "0.6em",
          fontWeight: "500",
        }}
        src={`https://countryflagsapi.com/svg/${render(item.country_name)}`}
        alt={`${item.country_name} flag`}
      />
    </div>
  );
};

export default CountryItem;
