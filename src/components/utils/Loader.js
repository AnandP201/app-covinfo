import React from "react";

const Loader = ({ content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        marginTop: "50px",
        top: 0,
        minHeight: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
      <div
        style={{
          color: "black",
          fontWeight: "500",
          fontSize: "0.8em",
          marginLeft: "0.5em",
        }}
      >
        {`${content}......`}
      </div>
    </div>
  );
};

export default Loader;
