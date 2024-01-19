import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../dataContext";

function Loan() {
  const { data } = useContext(DataContext);
  const [loanType, setLoanType] = useState("Home Loan");
  const [loanAmt, setLoanAmt] = useState(0);
  const navigate = useNavigate();
  let loanROI = 8;
  switch (loanType) {
    case "Home Loan":
      loanROI = 8;
      break;
    case "Education Loan":
      loanROI = 5;
      break;
    case "Car Loan":
      loanROI = 9;
      break;
    case "Personal Loan":
      loanROI = 10;
      break;
    default:
      loanROI = 8;
      break;
  }
  const [loanYears, setLoanYears] = useState(0);
  const total = (loanAmt * ((100 + loanROI) / 100) ** loanYears).toFixed(2);
  const interest = (total - loanAmt).toFixed(2);
  const options = {
    method: "PUT",
    url: `http://localhost:8081/customer/loan`,
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
    data: {
      amt: loanAmt,
      type: loanType,
      years: loanYears,
    },
  };
  const loanFn = (e) => {
    e.preventDefault();
    if (loanAmt > 0 && loanAmt < 100000000) {
      axios
        .request(options)
        .then((res) => {
          if (res.status === 200) {
            alert(
              `Hurray We have provided ${loanType} of rupees ${loanAmt} for ${loanYears} years`,
            );
            setLoanAmt(0);
            setLoanYears(0);
            document.getElementById("loanInput").value = "";
            document.getElementById("loanYears").value = "";
          } else alert("Some internal error happened. Please try again.");
        })
        .catch(() => {
          navigate("/error");
        });
    } else {
      alert("Sorry you can't take loan of this much amount from our bank.");
    }
  };
  return (
    <div className="operationCard" id="loanCard">
      <p className="heading">Apply For Loan</p>
      <form onSubmit={loanFn}>
        <label htmlFor="loanType">Please select the loan type</label>
        <select
          name="loans"
          id="loanType"
          onChange={(event) => setLoanType(event.target.value)}
        >
          <option>Home Loan</option>
          <option>Education Loan</option>
          <option>Personal Loan</option>
          <option>Car Loan</option>
        </select>
        <p>
          We are providing {loanROI}% rate of interest for {loanType}.
        </p>
        <label htmlFor="loanInput">
          Enter the amount of which you want to take Loan
        </label>
        <input
          id="loanInput"
          className="inputBox"
          type="number"
          placeholder="Enter Loan Amount"
          onKeyDown={(e) => {
            if (
              Number(e.target.value) > 999999999 ||
              e.which === 38 ||
              e.which === 40 ||
              e.which === 190 ||
              e.which === 189
            ) {
              // Check if the key pressed is a digit
              if (e.key !== "Backspace") e.preventDefault(); // If not, prevent the input
            }
          }}
          onChange={(event) => setLoanAmt(event.target.value)}
          required
        />
        <label htmlFor="loanYears">
          Enter the number of years for which you want to take loan
        </label>
        <input
          id="loanYears"
          className="inputBox"
          type="number"
          placeholder="Enter no. of years"
          onChange={(event) => setLoanYears(event.target.value)}
          onKeyDown={(e) => {
            if (
              Number(e.target.value) > 9 ||
              e.which === 38 ||
              e.which === 40 ||
              e.which === 190 ||
              e.which === 189
            ) {
              // Check if the key pressed is a digit
              if (e.key !== "Backspace") e.preventDefault(); // If not, prevent the input
            }
          }}
          required
        />
        {loanAmt !== null &&
        loanYears !== null &&
        loanYears > 0 &&
        loanAmt > 0 ? (
          <div id="calculateDiv">
            After {loanYears} year(s) your total repay amount will be &#8377;
            {total}. You have to give an interest of &#8377;
            {interest} only.
          </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Loan;
