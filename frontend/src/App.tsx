import { useRecoilValue } from 'recoil'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { selectedUserState } from './atoms/selectedUser'
import { ChatSection } from './components/ChatSection';

function App() {

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

export default App
