import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";
import { selectedUserState } from "../atoms/selectedUser";

interface ISocketProvider {
  children?: React.ReactNode
}

interface ISocketContext {
  sendMessage: (msg: string, fromEmail: string, toEmail: string) => any;
  sendTypingSignal: (from: string, to: string) => void;
  sendReadSignal: (from: string, to: string) => void;
  messages: IMessages[];
  users: string[];
  isTyping: boolean;
  read: [string, string][]
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

interface IMessages {
  msg: string;
  fromEmail: string;
  toEmail: string;
}

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {

  const [socket, setSocket] = useState<Socket>();
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [read, setRead] = useState<[string, string][]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg: string, fromEmail: string, toEmail: string) => {
      socket?.emit(
        "event:message",
        JSON.stringify({ msg, fromEmail, toEmail })
      );
      setMessages((prev) => [...prev, { msg, fromEmail, toEmail }]);
    },
    [socket]
  );

  const sendTypingSignal: ISocketContext["sendTypingSignal"] = useCallback(
    (from: string, to: string) => {
      socket?.emit("event:typing", JSON.stringify({ from, to }))
    },
    [socket]
  )

  const sendReadSignal: ISocketContext["sendReadSignal"] = useCallback(
    (from: string, to: string) => {
      console.log('h', from, to);
      socket?.emit("event:message:read", JSON.stringify({ from, to }));
    },
    [socket]
  )

  const onMessageReply = useCallback((data: any) => {
    const { msg, fromEmail, toEmail } = JSON.parse(data);
    console.log(msg, fromEmail, toEmail);
    setMessages((prev) => [...prev, { msg, fromEmail, toEmail }]);
  }, []);


  const getUserList = useCallback((data: any) => {
    console.log(Object.keys(data));
    setUsers(Object.keys(data));
  }, []);

  const onTypingReply = useCallback((data: any) => {

    const { } = JSON.parse(data);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000)
  }, [])

  const onMessageReadReply = useCallback((data: any) => {
    const { from, to } = JSON.parse(data);
    setRead(prev => [...prev, [from, to]]);
  }, [])

  useEffect(() => {
    console.log('re', read);
  }, [read])

  useEffect(() => {

    const _socket = io('http://localhost:8000', {
      query: {
        userToken: localStorage.getItem('username')
      }
    });

    _socket.on("userList", getUserList);
    _socket.on("event:message:reply", onMessageReply);
    _socket.on("event:typing:reply", onTypingReply);
    _socket.on("event:message:read:reply", onMessageReadReply);

    setSocket(_socket);

    return () => {

      _socket.off("userList", getUserList);
      _socket.off("event:message:reply", onMessageReply);
      _socket.off("event:typing:reply", onTypingReply);
      _socket.off("event:message:read:reply", onMessageReadReply)

      _socket.disconnect();
      setSocket(undefined);
    }

  }, [])

  return (
    <SocketContext.Provider value={{
      sendMessage,
      messages,
      users,
      sendTypingSignal,
      isTyping,
      sendReadSignal,
      read
    }} >
      {children}
    </SocketContext.Provider>
  )
}
