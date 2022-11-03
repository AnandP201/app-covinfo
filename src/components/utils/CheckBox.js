import React from "react";
const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: "500",
  padding: "0.2em",
};
const CheckBox = ({ content, index, type, dataFunc, data }) => {
  return (
    <div style={checkStyle}>
      <input
        id={`custom-${type}-chkbox-${index}`}
        type="checkbox"
        value={content}
        onChange={(ev) => {
          data[index] = ev.target.checked;
          dataFunc(data);
        }}
      />
      <label htmlFor={`custom-${type}-chkbox-${index}`}>{content}</label>
    </div>
  );
};

export default CheckBox;
