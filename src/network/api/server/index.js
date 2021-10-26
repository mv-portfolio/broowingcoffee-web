import axios from 'axios';
import {SERVER_URL, SECRET_KEY} from 'config/env';
import requestResolve from './interceptors/request/resolve';
import requestReject from './interceptors/request/reject';
import responseResolve from './interceptors/response/resolve';
import responseReject from './interceptors/response/reject';

export const timeout = seconds => 1000 * seconds;

const server = axios.create({
  baseURL: `${SERVER_URL}/${SECRET_KEY}/api/service`,
  timeout: timeout(5),
});

export const ConfigInterceptor = store => {
  server.interceptors.request.use(requestResolve, requestReject);
  server.interceptors.response.use(responseResolve, responseReject(store));
};

export default server;
