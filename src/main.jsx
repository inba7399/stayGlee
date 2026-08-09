// base.css must be imported before App so that component stylesheets, which
// load with the component modules, win ties against the global defaults.
import './styles/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
