import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoLocationSharp, IoOpen } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import { TiWarning } from "react-icons/ti";
import { MdMyLocation, MdCoronavirus } from "react-icons/md";
import { useProfile } from "../../context/profile.context";
import RiskItem from "../RiskItem";

const Location = ({ isFlagged }) => {
  const { user, location, setLocation, setNotify } = useProfile(null);
  const [data, setData] = useState(null);
  const [size, setSize] = useState(null);
  const [infoModal, setInfoModal] = useState(false);

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  function renderCityOrTown(location) {
    return location.address.city
      ? location.address.city
      : location.address.town;
  }

  const [loc, setLoc] = useState({
    latitude: 0,
    longitude: 0,
  });

  function fetchRecords() {
    const phno = user.phno;
    const l = renderCityOrTown(location);

    axios.get(`/record/${phno}/${l}`).then((res) => {
      setData(res.data.data);
      setSize(res.data.data.length);
    });
  }

  useEffect(() => {
    if (user === null) {
      setLocation(null);
      setData(null);
      setSize(null);
    } else {
      location && user && fetchRecords();
    }
    // eslint-disable-next-line
  }, [user, location]);

  function handleUpdateLocation() {
    if (user) {
      navigator.geolocation.getCurrentPosition((res) => {
        setLoc({
          ...loc,
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      });

      axios
        .get(
          `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOC_KEY}&lat= ${loc.latitude}&lon=${loc.longitude}&format=json`
        )
        .then((res) => {
          setLocation(res.data);
        });
    } else {
      setNotify({ flag: true, message: "You must be logged in to continue !" });
    }
  }

  return (
    <div className="location-section">
      <div className="loc_container">
        <div className="location_bar">
          <div className="location_stats">
            <IoLocationSharp
              size={25}
              color="red"
              style={{ padding: "0.2em" }}
            />
            <div style={{ fontSize: "0.75em", padding: "0.2em" }}>
              {location === undefined || !location ? (
                user ? (
                  <span className="grey_text">
                    &nbsp; &nbsp;Click on update button to update your location
                  </span>
                ) : (
                  <span className="grey_text">
                    &nbsp; &nbsp; Please sign-up or login to access tracking
                    services
                  </span>
                )
              ) : (
                location.display_name
              )}
            </div>
          </div>

          {user && (
            <div className="reports_stats animate__animated animate__fadeIn">
              <div
                style={{
                  padding: "2px",
                  color: "white",
                  fontWeight: "100",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {size > 0 && (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "2em",
                        fontWeight: "500",
                        color: "#8b008b",
                        textShadow: "2px -1px 2px rgba(255,255,255,0.65)",
                      }}
                    >
                      {size}{" "}
                    </span>{" "}
                    &nbsp; covid patient(s) around your area &nbsp;{" "}
                    <span
                      className="open_p_dets"
                      onClick={() => {
                        setInfoModal(true);
                      }}
                    >
                      <IoOpen size={20} />
                    </span>
                  </span>
                )}
                {size === 0 && !isFlagged && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: `${isPhone ? "5px" : ""}`,
                    }}
                  >
                    You are safe, no COVID patients around you
                  </span>
                )}
                {size === 0 && isFlagged && (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Take care, stay isolated !
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mob_location">
          <h2 style={{ fontWeight: "500", padding: "0.1em" }}>Track Covid</h2>
          <div
            style={{ fontSize: "0.8em", marginTop: "5px", padding: "0.2em" }}
          >
            Be safe, be alert ! <br />
            Get live updates of covid cases around you.
            <br />
            <br />
            <span className="bold_text">Covinfo</span> helps you do that easily
            !&nbsp;
            <span
              className="loc_btn"
              onClick={() => {
                handleUpdateLocation();
              }}
            >
              Update
            </span>{" "}
            your location and find risks of covid around you.
          </div>
        </div>
      </div>
      {infoModal && (
        <div className="overlay">
          <div className="p_info_modal">
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "0.5em",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TiWarning color="yellow" size={25} />
              <h3>Risks around you</h3>
              <span
                className="cross_sym"
                onClick={() => {
                  setInfoModal(false);
                }}
              >
                <GrFormClose size={20} />
              </span>
            </div>
            <hr />
            <div>
              <div
                style={{
                  padding: "0.9em",
                  fontSize: "0.8em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MdMyLocation size={20} color="red" />
                  &nbsp;
                  <span style={{ fontWeight: "500" }}>{`${renderCityOrTown(
                    location
                  )}, ${location.address.state}, ${
                    location.address.country
                  }`}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MdCoronavirus size={20} color="green" /> &nbsp; {data.length}{" "}
                  cases active !
                </div>
              </div>

              <div className="p_info_container">
                {data.map((item, index) => {
                  return <RiskItem item={item} index={index} key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
