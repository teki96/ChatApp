import React from "react";
import MessageItem from "./MessageItem";
import "./MessagesList.css";

const MessagesList = (props) => {
  return (
    <ul className="messages-list">
      {props.items.map((message) => (
        <MessageItem
          key={message.id}
          id={message.id}
          username={message.username}
          message={message.message}
          image={"https://static.thenounproject.com/png/4035892-200.png"}
        />
      ))}
    </ul>
  );
};

export default MessagesList;
