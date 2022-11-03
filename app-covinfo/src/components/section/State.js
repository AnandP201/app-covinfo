import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Loader from "../utils/Loader";

const State = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [val, setVal] = useState(null);

  const isPhone = window.matchMedia("(max-width : 480px)").matches;
  const fetchCountryData = () => {
    axios
      .get(
        "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
        {
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
            "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setData(res.data.state_wise);
      });
  };

  function searchAndShow(val) {
    Object.entries(data).forEach((item) => {
      if (item[0].toLowerCase() === val.toLowerCase()) {
        console.log(item[1]);
        setVal(item[1]);
      }
    });
  }

  function renderValues(str) {
    return parseInt(str).toLocaleString("en-US");
  }

  useEffect(() => {
    !data && fetchCountryData();
  }, [data]);

  return (
    <div>
      {loading && <Loader content={"data"} />}
      {!loading && (
        <div className="state_section">
          <div className="state_sec1">
            <h2
              style={{
                padding: `${isPhone ? "" : "1em 0.4em"}`,
                fontWeight: "400",
              }}
            >
              Know Your State
            </h2>
            <div className="state_search_bar">
              <input
                type="text"
                placeholder="Type state name here"
                onChange={(ev) => {
                  setInput(ev.target.value);
                }}
              />
              <div
                onClick={() => {
                  searchAndShow(input);
                }}
              >
                <GoSearch size={15} />
              </div>
            </div>
          </div>
          <div className="state_sec2">
            {val ? (
              <div>
                <h3
                  style={{
                    fontWeight: "500",
                    padding: "0.3em",
                    color: "#8b008b",
                    textShadow: "1px 1px 4px rgba(0,0,0,0.45)",
                  }}
                >{`${val.state} (${val.statecode})`}</h3>
                <div className="state-main-content">
                  <span>{renderValues(val.confirmed)}</span> total cases
                  confirmed, where in <span>{renderValues(val.deaths)} </span>{" "}
                  deaths were reported.
                  <br />
                  <br />
                  Active cases were <span>
                    {renderValues(val.active)}{" "}
                  </span> and <span>{renderValues(val.recovered)}</span> people
                  were recovered from COVID-19 till date.
                </div>
                <div
                  style={{
                    padding: "0.4em",
                    fontSize: "0.7em",
                    color: "#ccc",
                    fontWeight: "500",
                  }}
                >
                  Taken on : {val.lastupdatedtime}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "14px" }}>
                Get to know about the covid statistics and the affect caused by
                the novel coronavirus in any state of India <br />
                <br /> Start searching and look for the reports....
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default State;
