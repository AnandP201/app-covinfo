import axios from "axios";
import React, { useState } from "react";
import { AiFillEye, AiFillLock } from "react-icons/ai";
import { useProfile } from "../context/profile.context";

const Login = ({ modalOpen, handleModalOpen }) => {
  const { setUser } = useProfile(null);
  const { notify, setNotify } = useProfile();
  const [showPassword, setShowPassword] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const email = creds.email;
    const password = creds.password;
    axios
      .get(`/user/${email}/${password}`)
      .then((res) => {
        const token = res.data.doc.token;
        const user = res.data.doc.user;

        setTimeout(() => {
          localStorage.setItem("token", token);
          setUser(user);
          setNotify({ ...notify, flag: true, message: "Logged in !" });
        }, 400);

        handleModalOpen(false);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  return (
    <div>
      {modalOpen && (
        <div className="overlay  animate__animated animate__fadeIn">
          <div className="login_modal">
            <div className="login_form">
              <h2
                align="center"
                style={{ marginBottom: "12px", fontWeight: "500" }}
              >
                Login
              </h2>
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(ev) => {
                  setCreds({ ...creds, email: ev.target.value });
                }}
              />

              <div className="password-toggle" style={{ marginTop: "12px" }}>
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Enter your login password"
                  onChange={(ev) => {
                    setCreds({ ...creds, password: ev.target.value });
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
              </div>
              <div
                className="button_div"
                onClick={() => {
                  handleLogin();
                }}
              >
                <span className="login_button">
                  <AiFillLock size={24} />
                  &nbsp; &nbsp;Login
                </span>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "bolder",
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
      )}
    </div>
  );
};

export default Login;
