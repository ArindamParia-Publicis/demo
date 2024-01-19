import { React, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../../../dataContext";

function Deposit() {
  const { data, setData } = useContext(DataContext);
  const [amt, setAmt] = useState(0);
  const navigate = useNavigate();
  const options = {
    method: "PUT",
    url: `http://localhost:8081/customer/deposit`,
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
    data: {
      balance: amt,
    },
  };
  const depositAmt = (e) => {
    e.preventDefault();
    if (
      Number(amt) > 0 &&
      Number(amt) + Number(data.balance) < Number(100000000)
    ) {
      axios
        .request(options)
        .then((res) => {
          if (res.status === 200) {
            alert(`${amt} rupees have been deposit in your account`);
            const dt = {
              token: data.token,
              name: data.name,
              email: data.email,
              balance: Number(data.balance) + Number(amt),
              phone: data.phone,
              accountNumber: data.accountNumber,
            };
            setData(dt);
            setAmt(0);
            document.getElementById("depositInput").value = "";
          } else alert("Some internal error happened. Please try again.");
        })
        .catch(() => {
          navigate("/error");
        });
    } else {
      alert("Sorry, We can't keep this much amount in our bank.");
    }
  };
  return (
    <div id="depositCard" className="operationCard">
      <div className="heading">
        <Link to="/Dashboard">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p>Deposit Money</p>
      </div>
      <p>How much amount do you want to deposit?</p>
      <form onSubmit={depositAmt}>
        <input
          id="depositInput"
          className="inputBox"
          type="number"
          placeholder="Enter deposit money"
          required
          onKeyDown={(e) => {
            if (
              Number(e.target.value) > 9999999 ||
              e.which === 38 ||
              e.which === 40 ||
              e.which === 190 ||
              e.which === 189
            ) {
              // Check if the key pressed is a digit
              if (e.key !== "Backspace") e.preventDefault(); // If not, prevent the input
            }
          }}
          onChange={(e) => setAmt(e.target.value)}
        />
        <Button type="submit">SUBMIT</Button>
      </form>
    </div>
  );
}

export default Deposit;
