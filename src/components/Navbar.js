import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BsFillUnlockFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { HiIdentification } from "react-icons/hi";
import { useProfile } from "../context/profile.context";

const Navbar = ({ handleLoginModalOpen, handleSignUpModalOpen }) => {
  const location = useLocation();
  const { user, setUser } = useProfile(null);
  const { setNotify } = useProfile();
  const [showPopup, setShowPopup] = useState(false);

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  return (
    <div>
      <div className="navbar flex_se">
        <h2 style={{ fontWeight: 500, color: "white", padding: "0.4em" }}>
          CovInfo
        </h2>
        <ul className="navbar_mid_list flex_sa">
          <li>
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              World
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={location.pathname === "/news" ? "active-link" : ""}
            >
              News & Guidelines
            </NavLink>
          </li>
        </ul>
        <div className="navbar_buttons flex_se">
          {!user && (
            <div
              className="nv_btn--signup"
              onClick={() => {
                handleSignUpModalOpen(true);
              }}
            >
              Sign Up
            </div>
          )}
          {!user && (
            <div
              className="nv_btn--login"
              onClick={() => {
                handleLoginModalOpen(true);
              }}
            >
              Login
            </div>
          )}
          {user && (
            <div
              className="nv_btn--logout"
              onClick={() => {
                setShowPopup((showPopup) => !showPopup);
              }}
            >
              <FaUserAlt size={25} className="profile-icon" />
            </div>
          )}
        </div>
        {showPopup && user && isPhone && (
          <div className="overlay">
            <div className="profile_popup">
              <div
                style={{
                  background: "blueviolet",
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: "5px 5px 0px 0px",
                  color: "white",
                }}
              >
                <div style={{ width: "90%" }}>
                  <HiIdentification size={20} />
                </div>
                <div
                  style={{ width: "10%" }}
                  onClick={() => {
                    setShowPopup(false);
                  }}
                >
                  <AiOutlineClose size={15} />
                </div>
              </div>
              <div className="flex_se pad_4px">
                <div style={{ textAlign: "center", padding: "4px" }}>
                  {user.name}
                </div>
              </div>

              <div className="pad_4px">
                <div
                  style={{
                    fontWeight: "500",
                    color: "#ccc",
                    fontSize: "0.7em",
                    textAlign: "center",
                  }}
                >
                  Joined On
                </div>
                <div style={{ textAlign: "center" }}>
                  {new Date(user.createdAt).toDateString().substring(4)}
                </div>
              </div>
              <div
                className="btn_lg"
                onClick={() => {
                  setTimeout(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setShowPopup(false);
                    setNotify({ flag: true, message: "Logged out !" });
                  }, 400);
                }}
              >
                <BsFillUnlockFill /> &nbsp; Logout
              </div>
            </div>
          </div>
        )}
        {showPopup && user && !isPhone && (
          <div className="profile_popup">
            <div
              style={{
                background: "blueviolet",
                textAlign: "center",
                borderRadius: "5px 5px 0px 0px",
                color: "white",
              }}
            >
              <HiIdentification size={20} />
            </div>
            <div className="flex_se pad_4px">
              <div style={{ textAlign: "center", padding: "4px" }}>
                {user.name}
              </div>
            </div>

            <div className="pad_4px">
              <div
                style={{
                  fontWeight: "500",
                  color: "#ccc",
                  fontSize: "0.7em",
                  textAlign: "center",
                }}
              >
                Joined On
              </div>
              <div style={{ textAlign: "center" }}>
                {new Date(user.createdAt).toDateString().substring(4)}
              </div>
            </div>
            <div
              className="btn_lg"
              onClick={() => {
                setTimeout(() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  setShowPopup(false);
                  setNotify({ flag: true, message: "Logged out !" });
                }, 400);
              }}
            >
              <BsFillUnlockFill /> &nbsp; Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
