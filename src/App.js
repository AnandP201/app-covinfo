import "./App.css";
import Navbar from "./components/Navbar";
import "animate.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCoronavirus } from "react-icons/md";
import { useProfile } from "./context/profile.context";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import Country from "./components/section/Country";
import Location from "./components/section/Location";
import ReportCovid from "./components/ReportCovid";
import Notify from "./components/utils/Notify";
import State from "./components/section/State";

function App() {
  const { user, setUser } = useProfile(null);
  const { notify, setNotify } = useProfile({ flag: false, message: null });
  const [isModalOpen, setModalOpen] = useState(false);

  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isAfffected, setAffected] = useState(false);
  const [selfData, setSelfData] = useState(null);
  const [modal, showModal] = useState(false);

  const isPhone = window.matchMedia("(max-width : 480px)").matches;

  function handleReportBtnClick() {
    setReportModalOpen(true);
  }

  function closeNotification() {
    setNotify({ ...notify, flag: false, message: null });
  }

  function handleDeleteReport() {
    axios.delete(`/record/${selfData.data._id}`).then((res) => {
      showModal(false);
      setSelfData(null);
      setAffected(false);
      setTimeout(() => {
        setNotify({
          flag: true,
          message: "Happy to see you are healthy again ! Report removed ",
        });
      });
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user && token) {
      axios
        .get("/user/me", {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          window.alert(err.response.data.message);
          localStorage.removeItem("token");
        });
    }
    if (!user && !token) {
      setUser(null);
    }

    user &&
      axios.get(`/record/${user.phno}`).then((res) => {
        setSelfData(res.data);
        if (res.data.data) {
          setAffected(true);
        }
      });

    return () => {
      if (notify.flag === true) {
        setTimeout(() => {
          closeNotification();
        });
      }
    };

    // eslint-disable-next-line
  }, [user, isAfffected, notify]);

  return (
    <div className="App">
      {notify.flag && <Notify message={notify.message} />}
      <Navbar
        handleLoginModalOpen={setModalOpen}
        handleSignUpModalOpen={setSignupModalOpen}
      />
      <SignUp
        modalOpen={isSignupModalOpen}
        handleModalOpen={setSignupModalOpen}
      />

      <Login modalOpen={isModalOpen} handleModalOpen={setModalOpen} />
      {isReportModalOpen && (
        <ReportCovid
          modalOpen={isReportModalOpen}
          handleModalOpen={setReportModalOpen}
          user={user}
          setFlag={setAffected}
        />
      )}
      <Location isFlagged={isAfffected} />
      {user && isAfffected && (
        <span
          className="active_p_info"
          onClick={() => {
            showModal(true);
          }}
        >
          <MdOutlineCoronavirus size={15} />
          &nbsp; COVID-19 Symptomatic !
        </span>
      )}
      {user && !isAfffected && (
        <div
          style={{
            display: "flex",
            justifyContent: `${isPhone ? "" : "center"}`,
            background: "rgba(138, 43, 226,0.5)",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: `${isPhone ? "" : "flex"}`,
              alignItems: "center",
              lineHeight: `${isPhone ? "25px" : ""}`,
              justifyContent: "center",
              padding: "0.5em",
              fontSize: `${isPhone ? "0.8em" : "0.9em"}`,
            }}
          >
            Are you not feeling well ? Assess yourself with a small survey and
            &nbsp;
            <span
              className="report_btn"
              onClick={() => {
                handleReportBtnClick();
              }}
            >
              report covid
            </span>
            &nbsp; ! We care for your health, and so for the society's !
          </div>
        </div>
      )}
      <State />
      <Country />
      {modal && (
        <div className="overlay">
          <div className="cov_symp_modal">
            <div style={{ padding: "0.4em" }}>
              <div style={{ padding: "0.4em" }}>
                <div>Reported On</div>
                <hr />
                <span style={{ fontWeight: "500", padding: "0.2em" }}>
                  {new Date(selfData.data.dor).toUTCString()}
                </span>
              </div>
              <div style={{ padding: "0.4em" }}>
                <div>Issues</div>
                <hr />
                <span style={{ fontWeight: "500", padding: "0.2em" }}>
                  {JSON.parse(selfData.data.desc).issues}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => {
                  showModal(false);
                }}
                className="report_btn"
              >
                Close
              </div>
              <div
                onClick={() => {
                  handleDeleteReport();
                }}
                className="submit_report_btn padded"
              >
                I have recovered
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
