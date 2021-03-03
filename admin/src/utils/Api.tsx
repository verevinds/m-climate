/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

export default function Api() {
  const cache = setupCache({
    maxAge: 60 * 1000,
  });
  let api;
  if (process.browser) {
    api = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? process.env.api
          : process.env.apiProduction,
      adapter: cache.adapter,
    });
  } else {
    api = axios.create({
      baseURL:
        process.env.NODE_ENV === 'development'
          ? process.env.apiServer
          : process.env.apiServerProduction,
      adapter: cache.adapter,
    });
  }
  return api;
}
