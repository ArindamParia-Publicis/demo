import React, { useContext } from "react";
import { DataContext } from "../../../dataContext";
import userImage from "../../../Images/profile-img.png";

function CustomerDetails() {
  const { data } = useContext(DataContext);
  return (
    <div id="userDetailCard">
      <p className="heading">Your Details</p>
      <div id="userImage">
        <img src={userImage} alt="User" />
      </div>
      <div className="line" />
      <p>
        <span>Name- </span>
        <span id="userName">{data.name}</span>
      </p>
      <p>
        <span>Email ID- </span>
        <span id="userEmail">{data.email}</span>
      </p>
      <p>
        <span>Phone No.- </span>
        <span id="userPhone">{data.phone}</span>
      </p>
      <p>
        <span>Account No.- </span>
        <span id="userAccount">{data.accountNumber}</span>
      </p>
      <p>
        <span>Account Balance.- &#8377;</span>
        <span id="accountBalance">{data.balance}</span>
      </p>
    </div>
  );
}
export default CustomerDetails;
