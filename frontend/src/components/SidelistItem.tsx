import React, { useEffect, useState } from "react";

interface ISideListItem {
  avatar: string,
  name: string,
  lastChatDate: string,
  text: string,
  isSelected: boolean
}

export const SideListItem: React.FC<ISideListItem> = (props) => {

  const { avatar, name, isSelected } = props;
  const [msg, setMsg] = useState<string>('');

  const getLastMessage = async () => {
    const req = await fetch('http://localhost:5000/api/v1/chat/getMsgBetweenUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromUsername: localStorage.getItem('username'),
        toUsername: name
      })
    })
    if (!req.ok) return '';
    const res = await req.json();
    console.log('ds', res.body[res.body.length-1]);
    const lastmsg = res.body[res.body.length-1].content;
    if (!lastmsg) return;
    setMsg(lastmsg);
  }

  useEffect(() => {
    getLastMessage();
  }, []);


  return (
    <div className={`flex items-center justify-evenly w-[25vw] h-[10vh] ${isSelected && 'bg-[#F6F6F6]'} `} >
      <div className="w-[3vw]" >
        <img src={avatar} alt="logo" className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[20vw]" >
        <p className="font-bold" >{name} </p>
        <p>{msg}</p>
      </div>
    </div>
  )
}
