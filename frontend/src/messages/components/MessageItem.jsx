import React, { useContext, useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import io from "socket.io-client";
import "./MessageItem.css";

import Avatar from "../../shared/components/avatar/Avatar";
import Button from "../../shared/components/button/Button";
import Modal from "../../shared/components/modal/Modal";

import { AuthContext } from "../../shared/components/context/auth-context";
import { deleteMessage } from "../api/messages";

const MessageItem = (props) => {
  const auth = useContext(AuthContext);
  const socketRef = useRef();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      console.log(data);
      socketRef.current.emit("deleteMessage", { id: props.id });
    },
    onError: (error) => {
      console.log(error);
    },
  });

 const deleteConfirmedHandler = () => {
  setShowConfirmationModal(false);
  deleteMessageMutation.mutate({
    id: props.id,
    token: auth.token,
  });
  socketRef.current.emit("messageDeleted", props.id);
};

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    socketRef.current = newSocket;

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button delete onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete the message?</p>
      </Modal>
      <li className="container">
        <div className="avatar-container">
          <div className="user-item__image">
            <Avatar
              image={props.image}
              alt={props.name}
              width="75px"
              height="75px"
            />
          </div>
          <h2>{props.username}</h2>
        </div>
        <h3>{props.message}</h3>
        <div className="message-item_actions">
          {auth.isLoggedIn && (
            <Button danger onClick={showConfirmationHandler}>
              Delete
            </Button>
          )}
        </div>
      </li>
    </>
  );
};

export default MessageItem;
