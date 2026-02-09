import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { loadFonts } from './lib/fonts'
import App from './App.tsx'

loadFonts()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
