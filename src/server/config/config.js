console.log('process.env.PORT', process.env.PORT)
export default {
    cors: {
        whitelist: ['http://localhost:3000']
    },
    proxy: {
        url: '/api',
        // to: 'http://react-ssr-api.herokuapp.com',
        to: 'http://localhost:5000',
        from: 'http://localhost:3000'
    },
    cluster: 'auto',
    port: process.env.PORT || 3000,
    host: 'http://localhost'
}
