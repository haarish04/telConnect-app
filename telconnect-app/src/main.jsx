import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ServiceApp from './ServiceApp.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServiceApp />
  </StrictMode>,
)
