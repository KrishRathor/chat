import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from './context/SocketProvider.tsx';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </SocketProvider>
  </StrictMode>,
)
