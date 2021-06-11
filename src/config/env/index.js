require('dotenv').config();

const {NODE_ENV, REACT_APP_VERSION} = process.env;
const BUILD_STATE = NODE_ENV;
const VERSION = REACT_APP_VERSION;

export {BUILD_STATE, VERSION};
