import { createStore, compose, applyMiddleware } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import rootReducer from './ducks'

const dev = process.env.NODE_ENV === 'development'
const devTools = dev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = devTools || compose
const axiosInstance = axios.create({
    baseURL: '/api'
})

const middlewares = [thunk.withExtraArgument(axiosInstance)]
const initialState = window.__INITIAL_STATE__
delete window.__INITIAL_STATE__

export default createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
)
