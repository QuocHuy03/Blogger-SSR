import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Background = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {children}
    </div>
  );
};

export default Background;
