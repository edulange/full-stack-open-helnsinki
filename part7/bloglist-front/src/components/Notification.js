/* eslint-disable */

import React from "react"
import { useSelector } from "react-redux"

export const ErrorNotification = () => {
  const errorMessage = useSelector(state => state.notifications.error);

  if (!errorMessage) {
    return null;
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  );
}

export const SuccessNotification = () => {
  const successMessage = useSelector(state => state.notifications.successMessage);

  if (!successMessage) {
    return null;
  }

  return (
    <div className="success">
      {successMessage}
    </div>
  );
}