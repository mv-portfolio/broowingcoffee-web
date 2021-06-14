import axios from 'axios';

const {REACT_APP_SERVER_API_LOCAL, REACT_APP_SECRET_KEY1} = process.env;

const timeout = seconds => 1000 * seconds;

const Server = axios.create({
  baseURL: `${REACT_APP_SERVER_API_LOCAL}/${REACT_APP_SECRET_KEY1}/api/service`,
  timeout: timeout(5),
});

export {Server};
