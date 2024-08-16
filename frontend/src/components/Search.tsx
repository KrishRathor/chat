import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allUsersState } from "../atoms/allUser";
import { BACKEND_URL } from "../backendurl";

export const Search: React.FC = () => {

  const [users, setUsers] = useRecoilState(allUsersState);
  const [searchValue, setSearchValue] = useState("");

  const getAllUsers = async () => {
    const req = await fetch(`${BACKEND_URL}/api/v1/users/getAllUsers`);
    if (!req.ok) {
      return;
    }
    const users = await req.json();
    if (!users.body) return;
    setUsers(users.body);
    return users.body;
  }


  useEffect(() => {

    if (searchValue === "") {
      getAllUsers();
    }

    const filetedUsers = users.filter(user => user.username.toLowerCase().includes(searchValue.toLowerCase()));
    setUsers(filetedUsers);
  }, [searchValue]);

  return (
    <div className="flex items-center bg-[#F6F6F6] border border-[#CBCBCB] rounded-md p-4" >
      <img src="/search.png" alt="search-icon" className="w-[30px] h-[30px] " />
      <input onChange={e => setSearchValue(e.target.value)} value={searchValue} placeholder="Search" className="text-gray-500 bg-[#F6F6F6] border-none w-full h-[4vh] ml-3" />
    </div>
  )
}
