import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

// Set Alert
export const setAlert = (msg, type, timeout = 5000) => dispatch => {
  console.log('setAlert fired');
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
