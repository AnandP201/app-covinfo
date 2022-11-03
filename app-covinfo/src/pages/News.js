import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import SignUp from "../components/SignUp";
import { useProfile } from "../context/profile.context";
import NewsContainer from "../components/NewsContainer";

const News = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { setUser } = useProfile(null);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:4000/user/me", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          window.alert(err.response.data.message);
        });
    } else {
      setUser(null);
    }
  });
  return (
    <div>
      <Navbar
        handleLoginModalOpen={setModalOpen}
        handleSignUpModalOpen={setSignupModalOpen}
      />
      <SignUp
        modalOpen={isSignupModalOpen}
        handleModalOpen={setSignupModalOpen}
      />
      <Login modalOpen={isModalOpen} handleModalOpen={setModalOpen} />
      <div className="animate__animated animate__fadeIn">
        <NewsContainer />
      </div>
    </div>
  );
};

export default News;
