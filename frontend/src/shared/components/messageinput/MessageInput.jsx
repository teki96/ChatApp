import React from "react";
import "./MessageInput.css";

const MessageInput = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="form-control">
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={onChange} />
      </form>
    </div>
  );
};

export default MessageInput;
