import React, { useState } from "react";
import { AiFillEye, AiOutlineInfoCircle } from "react-icons/ai";
import { validateEmail, validatePassword } from "../helpers/Misc";
import axios from "axios";
import { useProfile } from "../context/profile.context";

const SignUp = ({ modalOpen, handleModalOpen }) => {
  const { setUser, setNotify } = useProfile();
  const [signupdata, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
  });

  const inputStyle = { color: "black" };

  const [toggle, setToggle] = useState(false);
  const [info, showInfo] = useState(false);
  const [flag, setFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handlePost = () => {
    axios
      .post("/user", signupdata)
      .then((response) => {
        setTimeout(() => {
          handleModalOpen((modalOpen) => !modalOpen);

          const token = response.data.token;

          localStorage.setItem("token", token);

          axios
            .get("/user/me", {
              headers: {
                token: token,
              },
            })
            .then((res) => {
              setUser(res.data);
              setTimeout(() => {
                setNotify({
                  flag: true,
                  message: "User created and logged in !",
                });
              }, 400);
            });
        }, 800);
      })
      .catch((err) => {
        setNotify({ flag: true, message: err.response.data.msg });
      });
  };

  const check = () => {
    return (
      validatePassword(signupdata.password) &&
      validateEmail(signupdata.email) &&
      (signupdata.name !== "" || signupdata.phno !== "")
    );
  };

  const handleSubmit = () => {
    if (check()) {
      handlePost();
    } else {
      setFlag(true);
      window.alert("Fill out details properly!");
    }
  };

  return (
    <div>
      {modalOpen && (
        <div className="overlay animate__animated animate__fadeIn">
          <div className="signup_modal">
            <div className="sign_up_form">
              <h2 align="center" style={{ fontWeight: "500" }}>
                Sign-Up in CovInfo
              </h2>

              <input
                type="text"
                className="inp"
                placeholder="Your name here"
                onChange={(ev) => {
                  setSignUpData({ ...signupdata, name: ev.target.value });
                }}
              />

              <input
                type="text"
                style={inputStyle}
                placeholder="Your email here"
                onChange={(ev) => {
                  setSignUpData({ ...signupdata, email: ev.target.value });
                }}
              />

              <input
                type="text"
                style={inputStyle}
                placeholder="Enter your phone number here"
                onChange={(ev) => {
                  setSignUpData({ ...signupdata, phno: ev.target.value });
                }}
              />

              <div className="password-toggle">
                <input
                  className={flag ? "red-border" : ""}
                  style={inputStyle}
                  type={showPassword ? "password" : "text"}
                  placeholder="Enter a strong password"
                  onChange={(ev) => {
                    setSignUpData({ ...signupdata, password: ev.target.value });
                  }}
                />
                <div
                  onClick={() => {
                    setToggle((toggle) => !toggle);
                    setShowPassword((showPassword) => !showPassword);
                  }}
                  className={toggle ? "eye-toggle" : ""}
                >
                  <AiFillEye fontSize={20} />
                </div>
                <div
                  onClick={() => {
                    showInfo((info) => !info);
                  }}
                  className={info ? "info-toggle" : ""}
                >
                  <AiOutlineInfoCircle fontSize={20} />
                </div>
              </div>
              <div className={`info-div ${info ? "show" : "hide"}`}>
                Password should contain more than 8 characters.
                <br />
                Must contain 1 uppercase, 1 lowercase, 1 digit and a special
                character
              </div>
              <div className="button_div">
                <span
                  className="crt_button"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </span>
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: "bolder",
                  padding: "0.7em",
                  width: "fit-content",
                  margin: "0 auto",
                }}
                onClick={() => {
                  handleModalOpen((modalOpen) => !modalOpen);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
          s
        </div>
      )}
    </div>
  );
};

export default SignUp;
