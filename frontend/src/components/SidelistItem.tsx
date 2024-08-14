import React from "react";

interface ISideListItem {
  avatar: string,
  name: string,
  lastChatDate: string,
  text: string,
  isSelected: boolean
}

export const SideListItem: React.FC<ISideListItem> = (props) => {

  const { avatar, name, lastChatDate, text, isSelected } = props;

  return (
    <div className={`flex items-center justify-evenly w-[25vw] h-[10vh] ${isSelected && 'bg-[#F6F6F6]'} `} >
      <div className="w-[3vw]" >
        <img src={avatar} alt="logo" className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[20vw]" >
        <p className="font-bold" >{name} <span className="text-gray-500 ml-2" >{lastChatDate}</span> </p>
        <p>{text}</p>
      </div>
    </div>
  )
}
