import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();
  const options = {
    method: "POST",
    url: `http://localhost:8081/customer/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id,
      name: `${firstName} ${lastName}`,
      email,
      address,
      gender,
      phone,
      password,
      balance: Number(balance),
    },
  };
  const signUpUser = (e) => {
    e.preventDefault();
    if (rePassword === password && Number(balance) >= 1000) {
      axios
        .request(options)
        .then((res) => {
          if (res.status === 201) {
            alert("Hurray We have created an account for you in our bank.");
            navigate("/SignIn");
          } else {
            alert("Some internal error happened. Please try again.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div id="signUp">
      <h1>Please enter your details</h1>
      <form id="signUpInputs" onSubmit={signUpUser}>
        <label htmlFor="firstName-input">Enter your first name</label>
        <input
          id="firstName-input"
          type="text"
          placeholder="First Name"
          required
          onChange={(event) => setFirstName(event.target.value)}
        />
        <label htmlFor="lastName-input">Enter your last name</label>
        <input
          id="lastName-input"
          type="text"
          placeholder="Last Name"
          required
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="email-input">Enter your email id</label>
        <input
          id="email-input"
          type="email"
          placeholder="Email ID"
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="address-input">Enter your address</label>
        <input
          id="address-input"
          type="text"
          placeholder="Address"
          required
          onChange={(event) => setAddress(event.target.value)}
        />
        <label htmlFor="address-input">
          Enter your aadhaar number(12 digits)
        </label>
        <input
          id="aadhaar-input"
          type="text"
          inputMode="numeric"
          pattern="^\[0-9]{12}$"
          title="Please enter exactly 12 digits"
          placeholder="Aadhaar number"
          required
          onChange={(event) => setId(event.target.value)}
          onKeyDown={(e) => {
            if (Number(e.target.value) > 99999999999) {
              if (e.key !== "Backspace") e.preventDefault();
            }
          }}
        />
        <label htmlFor="phone-input">Enter your phone number(10 digits)</label>
        <input
          id="phone-input"
          type="text"
          inputMode="numeric"
          pattern="^\[0-9]{10}$"
          title="Please enter exactly 10 digits"
          placeholder="Phone number"
          required
          onChange={(event) => setPhone(event.target.value)}
          onKeyDown={(e) => {
            if (Number(e.target.value) > 999999999) {
              if (e.key !== "Backspace") e.preventDefault();
            }
          }}
        />
        <label htmlFor="balance-input">
          Enter the opening balance you want to deposit in your account(Greater
          than 1000)
        </label>
        <input
          id="balance-input"
          type="text"
          inputMode="numeric"
          pattern="^\[0-9]{4,7}$"
          title="Please provide an valid amount."
          placeholder="Opening amount"
          required
          onChange={(event) => setBalance(event.target.value)}
          onKeyDown={(e) => {
            if (Number(e.target.value) > 99999999) {
              if (e.key !== "Backspace") e.preventDefault();
            }
          }}
        />
        <p>Choose your gender</p>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            checked
            onChange={(event) => setGender(event.target.value)}
          />
          <label htmlFor="male">MALE</label>
          <br />
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onChange={(event) => setGender(event.target.value)}
          />
          <label htmlFor="female">FEMALE</label>
          <br />
        </div>
        <p className="warning">
          Your password must contains minimum one digit,one uppercase letter,
          one lowercase letter and one special character(!,@,#,$,%,^,&,*). Its
          length should be between 6-16.
        </p>
        <label htmlFor="password">Enter your password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          onKeyUp="checkPasswordMatch();"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="rePassword">Re enter your password</label>
        <input
          id="rePassword"
          type="password"
          placeholder="Re enter your password"
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
          onKeyUp="checkPasswordMatch();"
          onChange={(event) => setRepassword(event.target.value)}
          required
        />
        {/* {password !== "" && rePassword !== "" ? (
          password === rePassword ? (
            <p id="divCheckPasswordMatch" className="success">
              Password matches.
            </p>
          ) : (
            <p id="divCheckPasswordMatch" className="warning">
              Password does not match.
            </p>
          )
        ) : null}
        {password !== "" && rePassword !== "" && password === rePassword ? (
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
            password,
          ) ? (
            <p className="success">
              Hurray, your password complies with our rule.
            </p>
          ) : (
            <p className="warning">
              Your password does not comply with our password rules stated
              above.
            </p>
          )
        ) : null} */}
        <button type="submit" id="signup-btn">
          SIGN UP
        </button>
      </form>
    </div>
  );
}
export default SignUp;
