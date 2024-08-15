import { useEffect, useState } from "react";
import { Search } from "./Search";
import { SideListItem } from "./SidelistItem";
import { Chip } from "./Chip";
import { useRecoilState } from "recoil";
import { selectedChipState } from "../atoms/selectedChip";
import { selectedUserState } from "../atoms/selectedUser";

interface IUser {
  id: string;
  createdAt: string;
  username: string;
  email: string;
  avatar: string | null;
  password: string;
}

export const Sidebar: React.FC = () => {

  const [users, setUsers] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    const req = await fetch('http://localhost:5000/api/v1/users/getAllUsers');
    if (!req.ok) {
      return;
    }
    const users = await req.json();
    if (!users.body) return;
    setUsers(users.body);
    return users.body;
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  const [selectedChip, setSelectedChip] = useRecoilState(selectedChipState);
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);

  const handleChipClick = (text: string) => {
    setSelectedChip(text);
  };

  return (
    <div className='ml-2' >

      <div className='mt-2' >
        <Search />
      </div>

      <div className='flex mt-2'>
        {['All', 'Archived', 'Unread', 'Block'].map((chipText) => (
          <div
            key={chipText}
            className='mx-2 cursor-pointer'
            onClick={() => handleChipClick(chipText)}
          >
            <Chip text={chipText} isSelected={selectedChip === chipText} />
          </div>
        ))}
      </div>

      <div className='mt-2' >
        {
          users.map((user, index) => (
            <div key={index} onClick={() => setSelectedUser(user.username)} className='cursor-pointer mt-1 overflow-y-auto border border-gray-300 rounded-md' >
              <SideListItem
                name={user.username}
                avatar={user.avatar ?? "https://github.com/shadcn.png"}
                lastChatDate={'1 day'}
                text='some text will come soon here'
                isSelected={selectedUser === user.username}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}


