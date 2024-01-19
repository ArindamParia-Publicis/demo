import { React, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../../../dataContext";

function Withdraw() {
  const { data, setData } = useContext(DataContext);
  const [amt, setAmt] = useState(0);
  const navigate = useNavigate();
  const options = {
    method: "PUT",
    url: `http://localhost:8081/customer/withdraw`,
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
    data: {
      balance: amt,
    },
  };
  const withdrawAmt = (e) => {
    e.preventDefault();
    if (
      Number(amt) > 0 &&
      Number(amt) < 100000000 &&
      Number(data.balance) - Number(amt) > Number(1000)
    ) {
      axios
        .request(options)
        .then((res) => {
          if (res.status === 200) {
            alert(`${amt} rupees have been withdrawn from your account`);
            const dt = {
              token: data.token,
              name: data.name,
              email: data.email,
              balance: Number(data.balance) - Number(amt),
              phone: data.phone,
              accountNumber: data.accountNumber,
            };
            setData(dt);
            setAmt(0);
            document.getElementById("withdrawInput").value = "";
          } else alert("Some internal error happened. Please try again.");
        })
        .catch(() => {
          navigate("/error");
        });
    } else {
      alert(
        "Sorry, you can't withdraw this amount. As you have to maintain minimum 1000 rupees in your account",
      );
    }
  };

  return (
    <div id="withdrawCard" className="operationCard">
      <div className="heading">
        <Link to="/Dashboard">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p>Withdraw Money</p>
      </div>
      <p>How much amount do you want to withdraw?</p>
      <form onSubmit={withdrawAmt}>
        <input
          id="withdrawInput"
          className="inputBox"
          type="number"
          placeholder="Enter withdraw money"
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

export default Withdraw;
