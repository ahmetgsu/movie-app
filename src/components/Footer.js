import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div
      className="ui container"
      style={{ textAlign: "center", marginTop: "30px" }}
    >
      Copyright &copy; {year}
    </div>
  );
};

export default Footer;
