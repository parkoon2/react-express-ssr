// https://expressjs.com/ko/advanced/best-practice-performance.html#use-gzip-compression
import compression from 'compression'

export default app => {
    app.use(compression())
}