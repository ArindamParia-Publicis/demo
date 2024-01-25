import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";
import Deposit from "./Components/Dashboard/DashboardComponents/Deposit";
import Withdraw from "./Components/Dashboard/DashboardComponents/Withdraw";
import { DataProvider } from "./dataContext";
import Error from "./Components/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/SignIn"
            element={
              <DataProvider>
                <SignIn />
              </DataProvider>
            }
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/Dashboard"
            element={
              <DataProvider>
                <Dashboard />
              </DataProvider>
            }
          >
            <Route path="Deposit" element={<Deposit />} />
            <Route path="Withdraw" element={<Withdraw />} />
            {/* <Route
              path="PreviousTransactions"
              element={<PreviousTransactions />}
            />
            <Route path="PreviousFDs" element={<PreviousFDs />} />
            <Route path="PreviousLoans" element={<PreviousLoans />} /> */}
          </Route>
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
