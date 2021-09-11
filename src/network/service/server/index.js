import {server} from 'network/api';

async function peek(route, config) {
  return await server.get(route, config);
}

async function set(route, body, config) {
  return await server.put(route, body, config);
}

async function push(route, body, config) {
  return await server.post(route, body, config);
}

async function pop(route, body, config) {
  return await server.delete(route, {...config, data: body});
}

export {peek, set, push, pop};
