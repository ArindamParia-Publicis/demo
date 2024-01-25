import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();
export function DataProvider({ children }) {
  const dt = {
    token: "",
    name: "",
    email: "",
    balance: 0,
    phone: "",
    accountNumber: "",
  };
  const [data, setData] = useState(dt);
  const contextValue = useMemo(() => ({ data, setData }), [data, setData]);
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
