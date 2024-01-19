import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../dataContext";

export function OpenFD() {
  const { data } = useContext(DataContext);
  const [amt, setFDAmount] = useState(0);
  const [years, setFDYears] = useState(0);
  const total = (amt * (107 / 100) ** years).toFixed(2);
  const navigate = useNavigate();
  const options = {
    method: "PUT",
    url: `http://localhost:8081/customer/fd`,
    headers: {
      "Content-Type": "application/json",
      Authorization: data.token,
    },
    data: {
      amt,
      years,
    },
  };
  const fdFn = (e) => {
    e.preventDefault();
    if (amt > 0 && amt < 100000000) {
      axios
        .request(options)
        .then((res) => {
          if (res.status === 200) {
            alert(
              `Hurray We have created FD of rupees ${amt} for ${years} years`,
            );
            setFDAmount(0);
            setFDYears(0);
            document.getElementById("FDInput").value = "";
            document.getElementById("FDYears").value = "";
          } else alert("Some internal error happened. Please try again.");
        })
        .catch(() => {
          navigate("/error");
        });
    } else {
      alert("We can't create FD of this much amount in our bank.");
    }
  };
  return (
    <div className="operationCard" id="FDCard">
      <p className="heading">Open FD</p>
      <p>Hurray, Currently we are giving 7% interest on Fixed Deposit</p>
      <form onSubmit={fdFn}>
        <label htmlFor="FDInput">
          Enter the amount of which you want to make FD
        </label>
        <input
          id="FDInput"
          className="inputBox"
          type="number"
          placeholder="Enter FD Amount"
          onChange={(event) => setFDAmount(event.target.value)}
          onKeyDown={(e) => {
            if (
              Number(e.target.value) > 999999999 ||
              e.which === 38 ||
              e.which === 40 ||
              e.which === 190
            ) {
              // Check if the key pressed is a digit
              if (e.key !== "Backspace") e.preventDefault(); // If not, prevent the input
            }
          }}
          required
        />
        <label htmlFor="FDYears">
          Enter the number of years for which you want to make FD
        </label>
        <input
          id="FDYears"
          className="inputBox"
          type="number"
          placeholder="Enter no. of years"
          onChange={(event) => setFDYears(event.target.value)}
          onKeyDown={(e) => {
            if (
              Number(e.target.value) > 9 ||
              e.which === 38 ||
              e.which === 40 ||
              e.which === 190
            ) {
              // Check if the key pressed is a digit
              if (e.key !== "Backspace") e.preventDefault(); // If not, prevent the input
            }
          }}
          required
        />
        {years > 0 && amt > 0 ? (
          <div id="FDResult">
            Your total amount after {years} year(s) will be &#8377;
            {total}.
          </div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default OpenFD;
