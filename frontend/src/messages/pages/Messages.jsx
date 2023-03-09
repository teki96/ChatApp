import React, { useState, useRef, useEffect, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";

import MessagesList from "../components/MessagesList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { AuthContext } from "../../shared/components/context/auth-context";
import { createMessage } from "../api/messages";

const Messages = () => {
  const messageRef = useRef();
  const [newMessage, setNewMessage] = useState("Enter a message");
  const { isLoading, error, data } = useQuery("messages", () => {
    return fetch("http://localhost:5000/api/messages").then((res) =>
      res.json()
    );
  });

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
  });

  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  if (messages === null) {
    setMessages(data);
  }

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    socketRef.current = newSocket;

    setMessages(data);

    socketRef.current.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((m) => m.id !== messageId)
      );
    });

    return () => {
      newSocket.disconnect();
    };
  }, [data]);

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    createMessageMutation.mutate({
      sender_id: auth.userId,
      username: auth.username,
      message: messageRef.current.value,
      token: auth.token,
    });

    socketRef.current.emit("sendMessage", {
      sender_id: auth.userId,
      username: auth.username,
      message: messageRef.current.value,
      token: auth.token,
    });
    console.log("Message sent: " + messageRef.current.value);
    setNewMessage("");
    history.push('/');
  };

  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  if (error) return "An error has occurred: " + error.message;

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  }

  return (
    <>
      {!messages ? (
        <MessagesList items={data} />
      ) : (
        <MessagesList items={messages} />
      )}
      <ScrollToBottom />
      <Input
        placeholder="Enter a message"
        ref={messageRef}
        value={newMessage}
        onChange={(event) => setNewMessage(event.target.value)}
      />
      <Button type="submit" onClick={messageSubmitHandler}>
        Send message
      </Button>
    </>
  );
};

export default Messages;
