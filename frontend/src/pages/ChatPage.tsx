import { useRecoilValue } from "recoil";
import { Sidebar } from "../components/Sidebar";
import { ChatSection } from "../components/ChatSection";
import { selectedUserState } from "../atoms/selectedUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ChatPage: React.FC = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!username) {
      navigate('/signin');
    }
  }, [])

  const selectedUser = useRecoilValue(selectedUserState);

  return (
    <div className="flex w-full" >
      <div className='w-fit' ><Sidebar /></div>
      {
        selectedUser && <div className='w-full' ><ChatSection /></div>
      }
    </div>

  )
}
