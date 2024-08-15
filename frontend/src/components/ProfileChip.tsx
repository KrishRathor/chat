import React from "react";
import { useSocket } from "../context/SocketProvider";

interface IProfileChip {
  name: string,
  avatar: string,
  status: string
}

export const ProfileChip: React.FC<IProfileChip> = (props) => {

  const { name, avatar, status } = props;
  const { isTyping } = useSocket();

  return (
    <div className={`flex items-center w-full h-[10vh] bg-[#F6F6F6] `} >
      <div className="w-[3vw] ml-8" >
        <img src={avatar} alt="logo" className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[20vw] ml-4" >
        <p className="font-bold" >{name} </p>
        <p className="text-gray-500" >{isTyping ? "typing..." : status}</p>
      </div>
    </div>
  )
}
