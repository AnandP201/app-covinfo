import React, { useEffect, useRef, useState } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import axios from "axios";
import Loader from "../utils/Loader";
import { useProfile } from "../../context/profile.context";
import CountryItem from "../CountryItem";
import CountryInfoItem from "../CountryInfoItem";
import lookup from "country-code-lookup";
import Flag from "react-country-flag";

const Country = () => {
  const trackRef = useRef(null);
  const [data, setData] = useState(null);
  const { user } = useProfile(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState({ count: 0, type: "INC" });

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  function loadCarousel() {
    if (trackRef.current) {
      const slides = trackRef.current.children;
      setCards(slides);
    }
  }

  function render(c) {
    switch (c) {
      case "UK":
        return "United Kingdom";
      case "USA":
        return "United States";
      case "Syria":
        return "Sy";
      case "Russia":
        return "RS";
      case "S. Korea":
        return "KR";
      default:
        return c;
    }
  }

  function toImg(name) {
    const c = lookup.byCountry(render(name));
    return c === null ? null : c.internet;
  }

  function renderRatio(obj) {
    var total = parseFloat(obj.cases.replaceAll(",", ""));

    var death =
      parseFloat(obj.deaths.replaceAll(",", "")) +
      parseFloat(obj.new_deaths.replaceAll(",", ""));

    return ((death / total) * 100).toFixed(2);
  }

  function updateCarousel() {
    var c = index.count;

    if (c >= 100) {
      trackRef.current.style.transform = "translateX(0px)";
      setIndex({ ...index, count: 0, type: "INC" });
      return;
    }

    if (cards[c]) {
      var i;
      if (isPhone) {
        for (i = 0; i < cards.length; i++) {
          cards[i].classList.remove("current_flag");
        }

        if (c > 0 && c % 3 === 0 && index.type === "INC") {
          trackRef.current.style.transform += "translateX(-" + 225 + "px)";
        }

        if ((c + 1) % 3 === 0 && index.type === "DEC") {
          trackRef.current.style.transform += "translateX(" + 225 + "px)";
        }
      } else {
        for (i = 0; i < cards.length; i++) {
          cards[i].classList.remove("current_flag");
        }

        if (c > 0 && c % 5 === 0 && index.type === "INC") {
          trackRef.current.style.transform += "translateX(-" + 475 + "px)";
        }

        if ((c + 1) % 5 === 0 && index.type === "DEC") {
          trackRef.current.style.transform += "translateX(" + 475 + "px)";
        }
      }
      cards[c].classList.add("current_flag");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex({ ...index, count: index.count + 1, type: "INC" });
    }, 8000);
    updateCarousel();
    return () => {
      clearTimeout(timer);

      if (!data) {
        setTimeout(() => {
          axios
            .get(
              "https://corona-virus-world-and-india-data.p.rapidapi.com/api",
              {
                headers: {
                  "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                  "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
                },
              }
            )
            .then((response) => {
              const arr = response.data.countries_stat;
              setData(arr.splice(0, 101));
              setIsLoading(false);
            })
            .catch((err) => {});
        }, 1500);
      }
      loadCarousel();
    };
    // eslint-disable-next-line
  }, [data, index, cards, user]);

  return (
    <div className="country_section animate__animated animate__fadeIn">
      {isLoading && <Loader content={"Fetching data...."} />}
      {!isLoading && (
        <div
          className="animate__animated animate__headShake"
          style={{ marginTop: "0.6em", padding: `${isPhone ? "1em" : ""}` }}
        >
          <h2
            style={{
              padding: `${isPhone ? "0.4em" : "0.4em 10em"}`,
              fontSize: `${isPhone ? "1.5em" : ""}`,
              fontWeight: "500",
            }}
          >
            Global Covid Status
          </h2>
          <div className="country_info">
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  padding: "0.2em",
                  width: "40%",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: `${isPhone ? "column" : "row"}`,
                    alignItems: "center",
                    height: `${isPhone ? "" : "20%"}`,
                    padding: "0.4em",
                  }}
                >
                  <Flag
                    countryCode={toImg(render(data[index.count].country_name))}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: `${isPhone ? "10px" : "20px"}`,
                      height: `${isPhone ? "20px" : "30px"}`,
                    }}
                    svg
                  />
                  &nbsp;{" "}
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: `${isPhone ? "0.8em" : ""}`,
                    }}
                  >
                    {data[index.count].country_name.toUpperCase()}
                  </span>
                </div>

                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      color: "#ccc",
                      fontSize: "0.8em",
                    }}
                  >
                    Death Index
                  </div>
                  <div
                    style={{
                      fontSize: "2em",
                      fontWeight: "500",
                    }}
                  >
                    {renderRatio(data[index.count])}
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "60%",
                  padding: "0.2em",
                }}
              >
                <CountryInfoItem
                  iconType={"all"}
                  value={data[index.count].cases}
                  tooltip={"Total Cases"}
                />
                <CountryInfoItem
                  iconType={"crt"}
                  value={data[index.count].serious_critical}
                  tooltip={"Critical count"}
                />
                <CountryInfoItem
                  iconType={"tst"}
                  value={data[index.count].total_tests}
                  tooltip={"Tests done"}
                />
                <CountryInfoItem
                  iconType={"act"}
                  value={data[index.count].active_cases}
                  tooltip={"Active cases"}
                />
                <CountryInfoItem
                  iconType={"dth"}
                  value={data[index.count].deaths}
                  tooltip={"Death count"}
                />
              </div>
            </div>
          </div>
          <div className="carousel_container">
            <div
              className="carousel_button--left"
              onClick={() => {
                if (index.count > 0) {
                  setIndex({ ...index, count: index.count - 1, type: "DEC" });
                }
              }}
            >
              <FiChevronsLeft size={40} />
            </div>
            <div className="carousel">
              <div className="carousel_track" ref={trackRef}>
                {data.map((item, index) => {
                  return <CountryItem item={item} key={index} />;
                })}
              </div>
            </div>
            <div
              className="carousel_button--right"
              onClick={() => {
                setIndex({ ...index, count: index.count + 1, type: "INC" });
              }}
            >
              <FiChevronsRight size={40} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
