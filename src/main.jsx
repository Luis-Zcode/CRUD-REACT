import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/styles.scss'
import './js/main'
import Router from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
