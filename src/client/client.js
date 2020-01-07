// Startup point for the client side application
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import Routes from './routes'
import store from './state/store'

// css
import './assets/styles/main.scss'

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
            {/* <div>{renderRoutes(Routes)}</div> */}
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)
