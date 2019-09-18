import React from "react";

function ErrorMessage(props) {
  const { errorMessage } = props;
  return (
    <div
      className="ui raised segment"
      style={{
        margin: "auto",
        textAlign: "center"
      }}
    >
      <h3 style={{ margin: "20px auto" }}>{errorMessage}</h3>
    </div>
  );
}

export default ErrorMessage;
