import React from "react";

export const Search: React.FC = () => {
  return (
    <div className="flex items-center bg-[#F6F6F6] border border-[#CBCBCB] rounded-md p-4" >
      <img src="/search.png" alt="search-icon" className="w-[30px] h-[30px] " />
      <input placeholder="Search" className="text-gray-500 bg-[#F6F6F6] border-none w-full h-[4vh] ml-3" />
    </div>
  )
}
