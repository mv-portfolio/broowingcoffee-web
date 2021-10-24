import {popLocalStorage} from 'storage';
import {ASSESSMENT_BAD_REQUEST, UNAUTHORIZED} from 'constants/network';
import {replace} from 'connected-react-router';
import {SET_ERROR} from 'modules/actions';

export default function responseReject({dispatch, getState}) {
  const {auth} = getState();
  return function (error) {
    console.log('INTERCEPTOR-ERROR', error.toJSON());

    if (error.message === 'Network Error') {
      return Promise.reject('Connection lost, please try again');
    }

    if (error.message.includes('timeout')) {
      let errorMessage = 'Something went wrong, please try again later';
      if (error.config.url === '/reset-password-encoder') {
        dispatch(SET_ERROR({forgotPassword: errorMessage}));
      }
      return Promise.reject(errorMessage);
    }

    const {status, data} = error.response;

    if (status === UNAUTHORIZED) {
      popLocalStorage('sat');
      dispatch(SET_ERROR({auth: data.err}));
    }

    if (status === ASSESSMENT_BAD_REQUEST) {
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
