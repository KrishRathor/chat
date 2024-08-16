import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../atoms/selectedUser";

interface IChatItem {
  text: string,
  isUser: boolean,
  timeStamp: string
}

export const ChatItem: React.FC<IChatItem> = (props) => {

  const { text, isUser, timeStamp } = props;
  const tousername = useRecoilValue(selectedUserState);
  const { read, sendReadSignal } = useSocket();
  const [isRead, setIsRead] = useState<boolean>(false);

  useEffect(() => {
    const fromusername = localStorage.getItem('username');
    if (!fromusername) return;
    read.map(r => {
      const u1 = r[0];
      const u2 = r[1];

      if ((u1 === tousername && u2 === fromusername) || (u1 === fromusername && u2 === tousername)) {
        setIsRead(true);
      }
    })
  }, [sendReadSignal, read, tousername]);

  return (
    <div className={`group ${isUser ? 'ml-auto mr-2' : 'ml-2'} `} >
      <div className={` ${isUser ? 'bg-[#EF6144] ml-auto mr-2' : 'bg-[#F6F6F6] ml-2'} flex flex-col py-3 rounded-md mt-2 px-4 w-fit `} >
        {text}
        <div className="hidden group-hover:block" >
          {timeStamp} {isRead ? 'Read' : 'Unread'} 
        </div>
      </div>
    </div>
  )
}
