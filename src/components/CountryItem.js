import React from "react";
import lookup from "country-code-lookup";
import Flag from "react-country-flag";

const CountryItem = ({ item }) => {
  function render(c) {
    switch (c) {
      case "USA":
        return "United States";
      case "UK":
        return "United Kingdom";
      case "Syria":
        return "Sy";

      case "S. Korea":
        return "South Korea";
      default:
        return c;
    }
  }

  function toImg(name) {
    const c = lookup.byCountry(render(name));
    return c === null ? null : c.internet;
  }

  const isPhone = window.matchMedia("(max-width : 480px)").matches;
  return (
    <div className="country_card">
      {toImg(item.country_name) && (
        <Flag
          countryCode={toImg(item.country_name)}
          style={{
            display: "flex",
            justifyContent: "center",
            width: `${isPhone ? "60px" : "80px"}`,
            height: `${isPhone ? "40px" : "50px"}`,
          }}
          svg
        />
      )}
      {!toImg(item.country_name) && (
        <div
          style={{
            width: `${isPhone ? "60px" : "80px"}`,
            height: `${isPhone ? "40px" : "50px"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8em",
          }}
        >
          {item.country_name}
        </div>
      )}
    </div>
  );
};

export default CountryItem;
