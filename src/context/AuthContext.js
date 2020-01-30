import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type){
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/users', { user: { email, password }});
      console.log(response.headers);

    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: 'add_error', payload: 'Something went wrong' });
    }
  }
}

const login = (dispatch) => {
  return ({ email, password }) => {

  }
}

const logout = (dispatch) => {
  return () => {

  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {signup},
  { isSignedIn: false, errorMessage: '' }
)