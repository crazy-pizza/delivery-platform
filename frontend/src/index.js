import React from 'react'
import ReactDOM from 'react-dom'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter,HashRouter } from "react-router-dom"
import { initStore } from '@store'
import App from './App'

ReactDOM.render(
  <HashRouter>
    <StoreContext.Provider value={initStore()}>
      <App />
    </StoreContext.Provider>
  </HashRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
