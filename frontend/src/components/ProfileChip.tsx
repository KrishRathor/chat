import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";

interface IProfileChip {
  name: string,
  avatar: string,
  status: string
}

export const ProfileChip: React.FC<IProfileChip> = (props) => {

  const { name, avatar, status } = props;
  const { isTyping } = useSocket();
  const [isArchive, setIsArchive] = useState<boolean>(false);

  const getStatus = async () => {
    const req = await fetch('http://localhost:5000/api/v1/status/getStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fromUsername: localStorage.getItem('username')
      })
    })
    if (!req.ok) return;
    const res = await req.json();
    const body = res.body;
    body.map((b: any) => {
      if (b.toUsername === toUsername) {
        if (b.status === "Archive") {
          setIsArchive(true);
        } else {
          setIsArchive(false);
        }
      }
    })
  }


  const toUsername = useRecoilValue(selectedUserState);

  useEffect(() => {
    getStatus();
  }, [toUsername]);

  // const handleArchive = async () => {
  //   if (!isArchive) {
  //     const req = await fetch('http://localhost:5000/api/v1/status/changeStatus', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         fromUsername: localStorage.getItem('username'),
  //         toUsername,
  //         status: 'Archive'
  //       })
  //     })
  //     if (!req.ok) return;
  //     const res = await req.json();
  //     console.log(res);
  //     getStatus();
  //   } else {
  //     const req = await fetch('http://localhost:5000/api/v1/status/changeStatus', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         fromUsername: localStorage.getItem('username'),
  //         toUsername,
  //         status: 'UnArchive'
  //       })
  //     })
  //     if (!req.ok) return;
  //     const res = await req.json();
  //     console.log(res);
  //     getStatus();
  //   }
  // }

  return (
    <div className={`flex items-center w-full h-[10vh] bg-[#F6F6F6] `} >
      <div className="w-[3vw] ml-8" >
        <img src={avatar} alt="logo" className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[20vw] ml-4" >
        <p className="font-bold" >{name} </p>
        <p className="text-gray-500" >{isTyping ? "typing..." : status}</p>
      </div>
      {//<div className="ml-auto mr-2" >
       // <button onClick={handleArchive} className={`${isArchive ? 'bg-gray-500' : 'bg-[#EF6144]'} px-4 py-2 rounded-md`} >{isArchive ? "UnArchive" : "Archive"}</button>
      //</div>
      }
    </div>
  )
}
