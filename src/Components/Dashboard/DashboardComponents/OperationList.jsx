import React from "react";
import "../Dashboard.css";
import { Link } from "react-router-dom";

function OperationList() {
  return (
    <div id="operationList" className="operationCard">
      <p className="heading">Bank Operations</p>
      <Link to="Deposit">
        <p className="operation">Deposit Money</p>
      </Link>
      <Link to="Withdraw">
        <p className="operation">Withdraw Money</p>
      </Link>
      <Link to="PreviousTransactions">
        <p className="operation">Show Last Transactions(Upto 20)</p>
      </Link>
      <Link to="PreviousFDs">
        <p className="operation">Show FDs(Upto 20)</p>
      </Link>
      <Link to="PreviousLoans">
        <p className="operation">Show Loans(Upto 20)</p>
      </Link>
    </div>
  );
}

export default OperationList;
