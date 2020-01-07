import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
// import reducers from '../../client/reducers';
import reducers from '../../client/state/ducks';
import config from '../config/config';

export default req => {
  const axiosInstance = axios.create({
    baseURL: config.proxy.to,
    headers: { cookie: req.get('cookie') || '' }
  });

  return createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};
