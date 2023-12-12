import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss'
import * as bootstrap from 'bootstrap'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="330271854417-jlvht3gh4akfbq7mtjvgm7um96jd5ca6.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>

  </React.StrictMode>,
)

