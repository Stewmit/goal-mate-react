import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import {store} from '../src/store/index'
import {createGlobalStyle} from 'styled-components'

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <>
            <Global/>
            <App/>
        </>
    </Provider>
)