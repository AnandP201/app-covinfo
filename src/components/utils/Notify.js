import React, { useEffect } from "react";
import { useProfile } from "../../context/profile.context";

const Notify = ({ message }) => {
  function closeNotification() {
    setNotify({ ...notify, flag: false, message: null });
  }

  const { notify, setNotify } = useProfile();

  useEffect(() => {
    if (notify.flag === true) {
      setTimeout(() => {
        closeNotification();
      }, 4000);
    }
    // eslint-disable-next-line
  }, [notify]);

  return (
    <div className="notification animate__animated animate__bounceIn">
      {message}
    </div>
  );
};

export default Notify;
