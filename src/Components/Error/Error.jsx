import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  return (
    <div id="error">
      <p>Don&apos;t worry. You have landed into an empty space.</p>
      <p>Please click on the below button to go to the safe zone.</p>
      <Link to="/"> Click on me</Link>
    </div>
  );
}

export default Error;
