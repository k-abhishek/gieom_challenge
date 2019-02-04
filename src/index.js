import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

/*
* !IMPORTANT
*
* unless your component requires different props/functionality on the client
* vs server, you should put it in App.js instead since that's the highest level
* component that's rendered on both client and server.
* */

ReactDOM.render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>,
  document.getElementById('root')
)
