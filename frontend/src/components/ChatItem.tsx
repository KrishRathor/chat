interface IChatItem {
  text: string,
  isUser: boolean,
  timeStamp: string
}

export const ChatItem: React.FC<IChatItem> = (props) => {

  const { text, isUser, timeStamp } = props;

  return (
    <div className={`group ${isUser ? 'ml-auto mr-2' : 'ml-2'} `} >
      <p className={` ${isUser ? 'bg-[#EF6144] ml-auto mr-2' : 'bg-[#F6F6F6] ml-2'} flex flex-col py-3 rounded-md mt-2 px-4 w-fit `} >{text}</p>
      <div className="hidden group-hover:block" >
        {timeStamp}
      </div>
    </div>
  )
}
