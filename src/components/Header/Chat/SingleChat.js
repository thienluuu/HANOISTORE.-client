import React, { useEffect, useState, useRef } from "react";
import "./SingleChat.scss";
import InputEmoji from "react-input-emoji";
import TimeAgo from "javascript-time-ago";

import { MdClose, MdOutlineSend } from "react-icons/md";
import {
  getAllMessagesByChatIdService,
  postMessagesByChatIdService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import moment from "moment";

var socket;

const SingleChat = ({
  userChat,
  setShowSingleChat,
  userData,
  setLatestMessage,
  fetchAgain,
  setFetchAgain,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getAllMessagesByChatId = async () => {
    try {
      const res = await getAllMessagesByChatIdService(userChat.chat.chatId);
      if (res && res.data.errCode === 0) {
        setIsLoading(false);
        setMessages(res.data.data);
      } else if (res && res.data.errCode === 2) {
        let data;
        if (userChat.roleId === "R1") {
          data = [
            {
              senderId: userChat.token,
              content:
                "Welcome to My Store, if you have any questions, please messaging to me at here!",
              chatId: userChat.chat.chatId,
            },
          ];
        } else {
          data = [
            {
              senderId: userChat.token,
              content: "I'm a new user",
              chatId: userChat.chat.chatId,
            },
          ];
        }
        setMessages(data);
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const addMessageToServer = async (data) => {
    try {
      const res = await postMessagesByChatIdService(data);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllMessagesByChatId();
    socket = io(process.env.REACT_APP_BACKEND_URL);
    socket.emit("setup", userData);
  }, []);
  useEffect(() => {
    if (fetchAgain === true) {
      getAllMessagesByChatId();
      setFetchAgain(false);
    }
  }, [fetchAgain]);

  //Chat
  useEffect(() => {
    socket.on("private-chat", (message) => {
      if (message.chatId === userChat.chat.chatId) {
        setMessages([...messages, message]);
      } else {
        return;
      }
    });
  });

  const submitMessage = (message, senderId) => {
    if (!message) {
      return;
    }
    let data = {
      senderId: senderId,
      content: message,
      chatId: userChat.chat.chatId,
    };
    socket.emit("private-chat", {
      chatId: userChat.chat.chatId,
      content: message,
      senderId: userData.token,
    });
    addMessageToServer(data);
  };
  const handleSendMessage = () => {
    submitMessage(newMessage, userData.token);
    setNewMessage("");
  };
  const handleSendMessageByKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      submitMessage(newMessage, userData.token);
      setNewMessage("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="single-chat-container">
      <div className="header">
        <div className="name">{userChat.userName}</div>
        <span className="close-btn" onClick={() => setShowSingleChat(false)}>
          <MdClose />
        </span>
      </div>
      <div className="body">
        <div className={isLoading ? "content skeleton" : "content"}>
          {messages &&
            messages.length > 0 &&
            messages.map((message, index) => {
              return (
                <div
                  className={
                    message.senderId === userData.token
                      ? "message-own"
                      : "message"
                  }
                  key={index}
                >
                  <p>
                    {message.content}
                    <span>
                      {moment(message.createdAt).startOf("minute").fromNow()}
                    </span>
                  </p>
                </div>
              );
            })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="footer">
        {/* <input type="file" /> */}
        <InputEmoji
          value={newMessage}
          type="text"
          autoFocus
          theme="light"
          onChange={setNewMessage}
          onKeyDown={(e) => handleSendMessageByKeyDown(e)}
        />
        <button onClick={() => handleSendMessage()}>
          <MdOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default SingleChat;
