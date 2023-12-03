/* eslint-disable */

import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ message, bgColor }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = `${bgColor} text-lightgrey text-lg border-solid border rounded-3xl p-4 mb-4`;

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
}

export const ErrorNotification = () => {
  const errorMessage = useSelector(state => state.notifications.errorMessage);
  return <Notification bgColor="bg-red-500" message={errorMessage}  />;
}

export const SuccessNotification = () => {
  const successMessage = useSelector(state => state.notifications.successMessage);
  return <Notification bgColor="bg-green-500" message={successMessage}  />;
}