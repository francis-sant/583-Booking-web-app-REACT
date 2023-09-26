// authActionTypes.js
export const SET_ROLE = 'SET_ROLE';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

// authActions.js

export const setRole = (role) => ({
  type: SET_ROLE,
  payload: role,
});

export const authenticate = () => ({
  type: AUTHENTICATE,
});

export const logout = () => ({
  type: LOGOUT,
});

// authReducer.js


const initialState = {
  role: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE:
      return { ...state, role: action.payload };
    case AUTHENTICATE:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export default authReducer;
