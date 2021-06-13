import {ACTION} from 'constants/string';

const REQUEST_PEEK_USER = () => ({
  type: ACTION.PEEK,
});

const REQUEST_SET_USER = user => ({
  type: ACTION.SET,
  user: user,
});

const UPDATE_USER = user => ({
  type: ACTION.UPDATE,
  user: user,
});

const DELETE_USER = () => ({
  type: ACTION.DELETE,
});

export {
  REQUEST_PEEK_USER,
  REQUEST_SET_USER,
  UPDATE_USER,
  DELETE_USER,
};
