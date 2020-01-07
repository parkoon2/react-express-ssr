import proxy from './proxy'
import morgan from './morgan'
import gzip from './gzip'
import helmet from './helmet'

const isDev = process.env.NODE_ENV === 'development'

export default app => {
    if (isDev) {
        morgan(app)
    }
    proxy(app)
    // gzip(app)
    // helmet(app)
}
