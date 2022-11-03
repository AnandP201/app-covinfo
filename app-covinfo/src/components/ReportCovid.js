import axios from "axios";
import React, { useState } from "react";
import { useProfile } from "../context/profile.context";
import CheckBox from "../components/utils/CheckBox";

const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: "500",
  padding: "0.2em",
};
const d = [
  "Cough",
  "Fever",
  "Sore Throat",
  "Difficulty in breathing",
  "Body Ache",
  "Loss of sense and taste",
];

const data = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

const xdata = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

const x = [
  "Diabetes",
  "Lung Disease",
  "Asthma",
  "Heart Disease",
  "Hypertension",
];

const t = { 0: "2 days", 1: "More than 4 days", 2: "More than 6 days" };

const ReportCovid = ({ modalOpen, handleModalOpen, user, setFlag }) => {
  const { location } = useProfile();
  const [issueData, setIssueData] = useState(data);
  const [condData, setCondData] = useState(xdata);
  const { setNotify } = useProfile();
  const [checkedState, setCheckedState] = useState([false, false, false]);

  function postData(data) {
    axios
      .post("/record", data)
      .then(() => {
        handleModalOpen((modalOpen) => !modalOpen);
        setFlag(true);
        setTimeout(() => {
          setNotify({ flag: true, message: "Covid reported succesfully !" });
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    var issues = [];
    var conditions = [];

    // eslint-disable-next-line
    d.map((item, index) => {
      if (issueData[index]) issues.push(item);
    });

    // eslint-disable-next-line
    x.map((item, index) => {
      if (condData[index]) conditions.push(item);
    });

    var val = "";
    for (var i = 0; i < 3; i++) {
      if (checkedState[i]) {
        val = t[i];
      }
    }

    const obj = {
      issues: issues.toString(),
      conditions: conditions.toString(),
      from: val,
    };

    if (val === "") {
      handleModalOpen(false);
      setNotify({
        flag: true,
        message: "Symptom observation date is missing !",
      });
      return;
    }

    if (location === null) {
      setNotify({
        flag: true,
        message: "Covid report needs the location ! Update your location ",
      });
      handleModalOpen(false);
      return;
    }

    const body = {
      name: user.name,
      phno: user.phno,
      desc: JSON.stringify(obj),
      location: location.address.city
        ? location.address.city
        : location.address.town,
      dor: Date.now(),
    };

    postData(body);
  }

  function handleCheck(pos) {
    for (var i = 0; i < 3; i++) {
      if (pos === i) {
        checkedState[i] = true;
      } else {
        checkedState[i] = false;
      }
    }
    setCheckedState({ ...checkedState });
  }

  return (
    <div>
      {modalOpen && (
        <div className="overlay">
          <div className="report_modal">
            <h2 align="center">Report Covid</h2>
            <hr color="#ccc" />
            <p style={{ fontSize: "12px", padding: "0.3em", marginTop: "5px" }}>
              Hey {user.name.split(" ")[0].toUpperCase()} , <br /> Your inputs
              will assist the efforts being taken to contain the Corona cases
              and asses various symptoms. Please help CovInfo in helping your
              society, and be honest while answering !
            </p>
            <div className="report_questions">
              <div>
                <div className="rep_q">
                  Are you experiencing any of the issues below ?
                </div>
                <div className="rep_t">
                  {d.map((item, index) => {
                    return (
                      <CheckBox
                        content={item}
                        key={index}
                        type={"i"}
                        index={index}
                        dataFunc={setIssueData}
                        data={issueData}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="rep_q">
                  Do you have any of the following pre-existing conditions ?
                </div>
                <div className="rep_t">
                  {x.map((item, index) => {
                    return (
                      <CheckBox
                        content={item}
                        key={index}
                        type={"c"}
                        index={index}
                        dataFunc={setCondData}
                        data={condData}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="rep_q">
                  How long have you been noticing the symptoms ?
                </div>
                <div className="rep_t">
                  <div style={checkStyle}>
                    <input
                      id="t-chk-0"
                      type="checkbox"
                      checked={checkedState[0]}
                      value={t[0]}
                      onChange={() => {
                        handleCheck(0);
                      }}
                    />
                    <label htmlFor="t-chk-0">{t[0]}</label>
                  </div>
                  <div style={checkStyle}>
                    <input
                      id="t-chk-1"
                      type="checkbox"
                      value={t[1]}
                      checked={checkedState[1]}
                      onChange={() => {
                        handleCheck(1);
                      }}
                    />
                    <label htmlFor="t-chk-1">{t[1]}</label>
                  </div>
                  <div style={checkStyle}>
                    <input
                      id="t-chk-2"
                      type="checkbox"
                      value={t[2]}
                      checked={checkedState[2]}
                      onChange={() => {
                        handleCheck(2);
                      }}
                    />
                    <label htmlFor="t-chk-2">{t[2]}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="report_modal_btns">
              <div
                className="submit_report_btn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                SUBMIT
              </div>
              <div
                className="cancel_rep_modal"
                onClick={() => {
                  handleModalOpen((modalOpen) => !modalOpen);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCovid;
