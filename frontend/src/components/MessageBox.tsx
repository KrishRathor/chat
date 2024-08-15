import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";

export const MessageBox: React.FC = () => {

  const [message, setMessage] = useState<string>('');
  const selectedChat = useRecoilValue(selectedUserState);
  const { sendMessage, sendTypingSignal } = useSocket();

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (message === "") return;
    const username = localStorage.getItem('username');
    if (!username) return;
    sendMessage(message, username, selectedChat);

    const req = await fetch('http://localhost:5000/api/v1/chat/sendMessage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: message,
        fromUsername: localStorage.getItem('username'),
        toUsername: selectedChat
      })
    })
    const res = await req.json();
    console.log(res);
    setMessage("")
  };

  return (
    <div className="bg-[#F6F6F6] flex p-4 justify-between" >
      <form className="flex justify-between w-full" >
        <input value={message} placeholder="Write your message here" onChange={(e) => {
          setMessage(e.target.value);
          const username = localStorage.getItem('username');
          if (!username) return;
          sendTypingSignal(username, selectedChat);
        }} className="text-gray-500 bg-[#F6F6F6] border-none w-full h-[4vh] ml-3" />
        <div className="flex" >
          <img src="/paper-clip.png" alt="right-arrow" className="w-[30px] h-[30px]" />
          <button type="submit" onClick={handleSendMessage} ><img src="/right-arrow.png" alt="right-arrow" className="w-[30px] h-[30px] ml-4 " /></button>
        </div>
      </form>
    </div>
  )
}
