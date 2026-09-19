import React from 'react'
import ReactDOM from 'react-dom/client'
import StayDetail from '../pages/StayDetail.jsx'
import '../index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StayDetail groupId="stayglee" />
  </React.StrictMode>,
)
