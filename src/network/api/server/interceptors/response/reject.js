import {popLocalStorage} from 'storage';
import {ASSESSMENT_BAD_REQUEST, UNAUTHORIZED} from 'constants/network';
import {replace} from 'connected-react-router';
import {CLEAR_LOADING, SET_ERROR} from 'ducks/actions';

export default function responseReject({dispatch, getState}) {
  const {auth} = getState();
  return function (error) {
    console.log('INTERCEPTOR-ERROR', error.toJSON());

    dispatch(CLEAR_LOADING());

    if (error.message === 'Network Error') {
      if (
        error.config.url === '/app-authentication' ||
        error.config.url === '/reset-password-encoder' ||
        error.config.url === '/signin-authentication-encoder'
      ) {
        dispatch(SET_ERROR({server: 'server maintenance'}));
      }

      return Promise.reject('Connection Lost, please try again later');
    }

    if (error.message.includes('timeout')) {
      let errorMessage = 'Something went wrong, please try again';
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
