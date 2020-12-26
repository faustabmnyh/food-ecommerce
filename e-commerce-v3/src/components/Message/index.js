import React from "react";

const Message = ({ condition, children }) => {
  return <div className={`alert alert__${condition || "info"}`}>{children}</div>;
};

export default Message;
