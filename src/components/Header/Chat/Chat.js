import React, { useState, useEffect } from "react";

import "./Chat.scss";
import { toast } from "react-toastify";
import {
  getChatsByUserIdService,
  createChatService,
} from "../../../services/userService";

const Chat = ({
  usersData,
  setShowSingleChat,
  setUserChat,
  userData,
  latestMessage,
  setFetchAgain,
}) => {
  const [chats, setChats] = useState([]);
  const [newUsers, setNewUsers] = useState([]);

  const getChats = async () => {
    try {
      const res = await getChatsByUserIdService(userData.token);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        setChats(res.data.data);
      } else {
        toast.error(res.data.message);
        setChats([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createChat = async (data) => {
    try {
      const res = await createChatService(data);
      if (res && res.data.errCode === 0) {
        toast.success(res.data.message);
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  useEffect(() => {
    let newUsers = usersData.map((user) => {
      let token = user.token;
      let data = chats.filter((chat) => chat.members.includes(token));
      if (data && data.length > 0) {
        user.chat = data[0];
      }
      return user;
    });
    newUsers = newUsers.filter((newUsers) => newUsers.chat);
    console.log(newUsers);
    if (chats.length > 0) {
      setNewUsers(newUsers);
    }
  }, [chats]);

  const handleCreateChat = (userChatId) => {
    let data = {
      members: [userChatId, userData.token],
    };
    createChat(data);
  };
  return (
    <div className="message-container">
      {chats && chats.length === 0 && userData && userData.roleId === "R2" && (
        <div className="admin-section">
          <div className="title">List Admin</div>
          <div className="list-admin">
            {usersData &&
              usersData.length > 0 &&
              usersData.map((user, index) => {
                return (
                  <div
                    className="admin-item"
                    onClick={() => {
                      handleCreateChat(user.token);
                    }}
                    key={index}
                  >
                    <div className="avatar">
                      <div
                        className="picture"
                        style={{ backgroundImage: `url(${user.image})` }}
                      />
                    </div>
                    <div className="message-content">{user.userName}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <div className="chat-section">
        <div className="title">Chats</div>
        <div className="list-chat">
          {newUsers &&
            newUsers.length > 0 &&
            newUsers.map((newUser, index) => {
              return (
                <div
                  className="chat-item"
                  onClick={() => {
                    setUserChat(newUser);
                    setShowSingleChat(true);
                    setFetchAgain(true);
                  }}
                  key={index}
                >
                  <div className="avatar">
                    <div
                      className="picture"
                      style={{ backgroundImage: `url(${newUser.image})` }}
                    />
                  </div>
                  <div className="message-content">{newUser.userName}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
