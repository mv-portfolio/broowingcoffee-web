require('dotenv').config();

const {REACT_APP_ENV, REACT_APP_VERSION} = process.env;
const BUILD_STATE = REACT_APP_ENV;
const VERSION = REACT_APP_VERSION;

export {BUILD_STATE, VERSION};
