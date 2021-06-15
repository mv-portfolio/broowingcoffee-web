import {Server} from '../api';

async function getRequestServer(route, config) {
  return await Server.get(route, config);
}

async function postRequestServer(route, body, config) {
  return await Server.post(route, body, config);
}

export {getRequestServer, postRequestServer};
