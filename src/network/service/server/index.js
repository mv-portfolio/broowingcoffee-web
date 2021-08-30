import {server} from 'network/api';

async function get(route, config) {
  return await server.get(route, config);
}

async function post(route, body, config) {
  return await server.post(route, body, config);
}

export {get, post};
