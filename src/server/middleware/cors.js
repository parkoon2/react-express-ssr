import cors from 'cors'
import config from '../config/config.js'

const isDev = process.env.NODE_ENV
export default app => {
    if (isDev) {
        app.use(cors())
    } else {
        const whitelist = config.cors.whitelist
        const corsOptions = {
            origin: (origin, callback) => {
                if (whitelist.indexOf(origin) !== -1 || !origin) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        }
        app.use(cors(corsOptions))
    }

}
