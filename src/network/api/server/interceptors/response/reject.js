import {popLocalStorage} from 'storage';
import {ASSESSMENT_BAD_REQUEST, NOT_FOUND, UNAUTHORIZED} from 'constants/network';
import {replace} from 'connected-react-router';

export default function responseReject({dispatch, getState}) {
  const {auth} = getState();

  return function (error) {
    if (error.message === 'Network Error') {
      return Promise.reject(error.message);
    }

    const {status, data} = error.response;

    if (status === NOT_FOUND || status === UNAUTHORIZED) {
      popLocalStorage('sat');
    }

    if (status === ASSESSMENT_BAD_REQUEST) {
      console.log('INTERCEPTOR', error.response);
      if (data.err.includes('Last Name') || data.err.includes('First Name')) {
        dispatch(
          replace({
            pathname: '/assessment/information',
            search: `?sat=${auth.secondary_auth_token || null}`,
          }),
        );
      }
      return Promise.reject(data.err);
    }

    return Promise.reject(data.err);
  };
}
