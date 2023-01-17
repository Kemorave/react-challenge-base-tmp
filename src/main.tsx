import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { store } from './app/store'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <Provider store={store}>
    <BrowserRouter basename='rest-countries-api-with-color-theme-switcher'>
    <App />
    </BrowserRouter>
  </Provider>,
)
