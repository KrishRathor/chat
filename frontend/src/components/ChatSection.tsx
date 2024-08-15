import React, { useEffect, useState } from "react";
import { ProfileChip } from "./ProfileChip";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";
import { MessageBox } from "./MessageBox";
import { useSocket } from "../context/SocketProvider";
import { ChatItem } from "./ChatItem";

interface IMessages {
  id: string;
  fromUsername: string;
  toUsername: string;
  content: string;
  createdAt: string;
}

export const ChatSection: React.FC = () => {

  const username = useRecoilValue(selectedUserState);
  const { messages, users, isTyping } = useSocket();
  const [status, setStatus] = useState<string>('');
  const [pastMessages, setPastMessages] = useState<IMessages[]>([]);
  // const [currentChat, setCurrentChat] = useState<IMessages[]>([]);

  useEffect(() => {
    // const currentchatmsg = messages.filter(message => message.toEmail === username);
    console.log(messages);
    //setCurrentChat(currentchatmsg);
  }, [messages])

  const getStatus = () => {
    let status = "offline";
    users.map(user => {
      if (user === username) {
        status = "online";
      }
    })
    return status;
  }

  useEffect(() => {
    setStatus(getStatus());
  }, [users, isTyping])

  useEffect(() => {

    console.log(username, localStorage.getItem('username'));

    const getmsg = async () => {
      const req = await fetch('http://localhost:5000/api/v1/chat/getMsgBetweenUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromUsername: localStorage.getItem('username'),
          toUsername: username
        })
      })
      const res = await req.json();
      console.log(res.body);
      setPastMessages(res.body);
    }
    getmsg();
  }, [username]);

  return (
    <div className="">
      <div className="" >
        <ProfileChip name={username} avatar="https://github.com/shadcn.png" status={status} />
      </div>

      <div className="overflow-y-auto bg-red-50 h-[83vh]" >
        {
          pastMessages.map((msg, index) => {
            return (
              <div key={index} >
                <ChatItem text={msg.content} isUser={msg.fromUsername === localStorage.getItem('username')} timeStamp="1 day" />
              </div>
            )
          })
        }
        {
          messages.map((msg, index) => {
            if (msg.fromEmail === username || (msg.fromEmail === localStorage.getItem('username') && msg.toEmail === username)) {
              return (
                <div key={index} >
                  <ChatItem text={msg.msg} isUser={msg.fromEmail === localStorage.getItem('username')} timeStamp="1 day" />
                </div>

              )
            }
          })
        }
      </div>

      <div>
        <MessageBox />
      </div>

    </div>
  )
}
