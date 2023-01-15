import React              from 'react'
import ReactDOM           from 'react-dom/client'
import reportWebVitals    from './reportWebVitals'

import App from './views/App'

import './vendor/w3/w3.css'
import './vendor/w3/w3-theme-dark-grey.css'

import './static/css/index.css'

import './static/css/Fading.css'



console.clear()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
