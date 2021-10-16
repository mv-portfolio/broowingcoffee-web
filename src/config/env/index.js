const {
  REACT_APP_ENV: ENV,
  REACT_APP_VERSION: VERSION,
  REACT_APP_SERVER: SERVER_URL,
  REACT_APP_CLIENT: CLIENT_URL,
  REACT_APP_SECRET_KEY1: SECRET_KEY,
} = process.env;

export {ENV, VERSION, CLIENT_URL, SERVER_URL, SECRET_KEY};
