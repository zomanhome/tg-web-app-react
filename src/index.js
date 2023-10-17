import './index.css';
import {createRoot} from 'react-dom/client'
import React from 'react'

import App from './App'

const app = document.querySelector('.app')
const root = createRoot(app)

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

