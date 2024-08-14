import React from "react";

interface IProfileChip {
  name: string,
  avatar: string,
  status: string
}

export const ProfileChip: React.FC<IProfileChip> = (props) => {

  const { name, avatar, status } = props;

  return (
    <div className={`flex items-center justify-evenly w-[25vw] h-[10vh] bg-[#F6F6F6] `} >
      <div className="w-[3vw]" >
        <img src={avatar} alt="logo" className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[20vw]" >
        <p className="font-bold" >{name} </p>
        <p className="text-gray-500" >{status}</p>
      </div>
    </div>
  )
}
