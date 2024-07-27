import React from "react";
import { useSelector } from "react-redux";

const ErrorMessage = () => {
  const errorMessage = useSelector((state) => state.error.errorMessage);

  return (
    errorMessage && (
      <div className="error">
        <p>{errorMessage}</p>
      </div>
    )
  );
};

export default ErrorMessage;