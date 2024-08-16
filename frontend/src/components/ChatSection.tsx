import React, { useEffect, useRef, useState } from "react";
import { ProfileChip } from "./ProfileChip";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";
import { MessageBox } from "./MessageBox";
import { useSocket } from "../context/SocketProvider";
import { ChatItem } from "./ChatItem";
import { fetchMessage } from "../atoms/fetchMessage";
import { BACKEND_URL } from "../backendurl";

interface IMessages {
  id: string;
  fromUsername: string;
  toUsername: string;
  content?: string;
  link?: string
  createdAt: string;
}

export const ChatSection: React.FC = () => {

  const username = useRecoilValue(selectedUserState);
  const { messages, users, isTyping } = useSocket();
  const [status, setStatus] = useState<string>('');
  const [pastMessages, setPastMessages] = useState<IMessages[]>([]);


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

  const fetchmsg = useRecoilValue(fetchMessage);

  useEffect(() => {
    const getmsg = async () => {
      const req = await fetch(`${BACKEND_URL}/api/v1/chat/getMsgBetweenUser`, {
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
      setPastMessages(res.body);
    }
    getmsg();
  }, [username, fetchmsg]);

  const calculateTime = (timestamp: string) => {
    const now: Date = new Date();
    const past: Date = new Date(timestamp);

    // @ts-ignore
    const diffInMilliseconds = Math.abs(now - past);
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return `${Math.floor(diffInDays)} days ago`;
    }
  }

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const { sendReadSignal } = useSocket();

  useEffect(() => {
    const u = localStorage.getItem('username');
    if (!u) return;
    sendReadSignal(u, username);
  }, [username]);

  return (
    <div className="">
      <div className="" >
        <ProfileChip name={username} avatar="https://github.com/shadcn.png" status={status} />
      </div>

      <div ref={chatContainerRef} className="overflow-y-auto bg-red-50 h-[83vh]" >
        {
          pastMessages.map((msg, index) => {
            if (msg.content) {
              return (
                <div key={index} >
                  <ChatItem text={msg.content} isUser={msg.fromUsername === localStorage.getItem('username')} timeStamp={calculateTime(msg.createdAt)} />
                </div>
              )
            } else if (msg.link) {
              return (
                <div key={index} className={`${msg.fromUsername === localStorage.getItem('username') && 'flex'}`} >
                  <img className={`${msg.fromUsername === localStorage.getItem('username') && 'ml-auto mr-2 flex'} rounded-md m-2 w-[15vw] h-[20vh]`} src={msg.link} alt="image" />
                </div>
              )
            }
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
