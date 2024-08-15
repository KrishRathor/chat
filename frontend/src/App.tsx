import { useState } from 'react'
import './App.css'
import { useSocket } from './context/SocketProvider';

function App() {

  const [message, setMessage] = useState('');
  const { sendMessage } = useSocket();

  return (
    <div className="" >

      <input placeholder='enter message' onChange={e => setMessage(e.target.value)} />
      <button onClick={() => {
        sendMessage(message);
      }}>Send</button>

    </div> 
  )
}

export default App
