import "./Dashboard.css";

import { Outlet, useLocation } from "react-router-dom";
import OperationList from "./DashboardComponents/OperationList";
import { OpenFD } from "./DashboardComponents/OpenFd";
import CustomerDetails from "./DashboardComponents/CustomerDetails";
import Loan from "./DashboardComponents/Loan";

function Dashboard() {
  const location = useLocation();

  return (
    <div id="dashboard">
      <CustomerDetails />
      <OpenFD />
      <Loan />
      {location.pathname === "/Dashboard" ? <OperationList /> : null}
      <Outlet />
    </div>
  );
}

export default Dashboard;
