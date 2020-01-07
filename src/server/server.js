import 'babel-polyfill'
import http from 'http'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import Routes from '../client/routes'
import renderer from './helpers/renderer'
import createStore from './helpers/store'
import proxy from 'express-http-proxy'
import config from './config/config'
import middlewareConfigure from './middleware'

const app = express()
const server = http.createServer(app)

middlewareConfigure(app)

app.use(express.static('public'))
app.get('*', (req, res) => {
    const store = createStore(req)

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadInitialData ? route.loadInitialData(store) : null
        })
        .map(promise => {
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve)
                })
            }
        })

    Promise.all(promises).then(() => {
        const context = {}
        const content = renderer(req, store, context)

        if (context.url) {
            return res.redirect(301, context.url)
        }
        if (context.notFound) {
            res.status(404)
        }

        res.send(content)
    })
})

server.on('listening', () => {
    console.log(`Server is running on ${config.port}.`)
})

server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error
    }
    switch (error.code) {
        case 'EACCES':
            console.error(`Pipe ${config.port} requires elevated privileges.`)
            process.exit(1)
        case 'EADDRINUSE':
            console.error(`Port ${config.port} is already in use.`)
            process.exit(1)
        default:
            throw error
    }
})

export default server
