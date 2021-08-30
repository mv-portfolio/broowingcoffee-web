import axios from 'axios';
import requestResolve from './interceptors/request/resolve';
import requestReject from './interceptors/request/reject';
import responseResolve from './interceptors/response/resolve';
import responseReject from './interceptors/response/reject';

const {REACT_APP_SERVER_API_LOCAL, REACT_APP_SECRET_KEY1} = process.env;

const timeout = seconds => 1000 * seconds;

const server = axios.create({
  baseURL: `${REACT_APP_SERVER_API_LOCAL}/${REACT_APP_SECRET_KEY1}/api/service`,
  timeout: timeout(5),
});

export const ConfigInterceptor = store => {
  server.interceptors.request.use(requestResolve, requestReject);
  server.interceptors.response.use(responseResolve, responseReject(store));
};

export default server;
