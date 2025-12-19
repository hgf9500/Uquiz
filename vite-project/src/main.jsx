import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. 이 줄을 추가하세요
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. App 컴포넌트를 BrowserRouter로 감싸주세요 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)