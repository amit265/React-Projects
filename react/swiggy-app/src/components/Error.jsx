import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  // console.log(err);
  return (
    <div style={{ backgroundColor: "white" }}>
      <h1>{err.status}</h1>
      <h2>{err.error.message}</h2>
    </div>
  );
};

export default Error;
