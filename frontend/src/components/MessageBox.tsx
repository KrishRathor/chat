export const MessageBox: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] flex p-4 justify-between" >
      <p className="text-gray-500">Type your message here</p>
      <div className="flex" >
        <img src="/paper-clip.png" alt="right-arrow" className="w-[30px] h-[30px]" />
        <img src="/right-arrow.png" alt="right-arrow" className="w-[30px] h-[30px] ml-4 " />
      </div>
    </div>
  )
}
