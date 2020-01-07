import proxy from 'express-http-proxy';
import config from "../config/config";
export default app => {
    app.use(
        config.proxy.url,
        proxy(config.proxy.to, {
          proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = config.proxy.from;
            return opts;
          }
        })
      );
}