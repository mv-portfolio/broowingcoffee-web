import {select} from 'redux-saga/effects';

export default function* serverConfig() {
  const auth = yield select(state => state.auth);
  return {
    headers: {
      'primary-auth-token': auth.primary_auth_token,
      'secondary-auth-token': auth.secondary_auth_token,
    },
    auth,
  };
}
