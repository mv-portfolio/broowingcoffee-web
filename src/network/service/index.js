import store from 'hooks/global/redux';
import {Server} from '../api';

const getState = () => store().getState();

const SERVER_REQUEST_CONFIG = () => ({
  headers: {
    'primary-auth-token': getState().user.primary_auth_token || '',
    'secondary-auth-token': getState().user.secondary_auth_token || '',
  },
});

async function getRequestServer(route) {
  return await Server.get(route, SERVER_REQUEST_CONFIG());
}

async function postRequestServer(route, body) {
  return await Server.post(route, body, SERVER_REQUEST_CONFIG());
}

export {getRequestServer, postRequestServer};
