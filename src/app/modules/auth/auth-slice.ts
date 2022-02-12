import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, IAuthState, UserState } from './auth-contracts';
import { USER_LOGGED_IN, ERROR_ON_LOGIN, USER_LOGGED_OUT } from './auth-constants';

const authSlice = createSlice({
  name: 'counter',
  initialState: initialState as IAuthState,
  reducers: {
    storeUser(state, action: PayloadAction<UserState>) {
      return {
        ...state,
        user: action.payload,
        status: USER_LOGGED_IN
      };
    },
    logoutUser(state) {
      return {
        ...state,
        user: null,
        status: USER_LOGGED_OUT
      };
    },
    changeStatus(state, action: PayloadAction<string>) {
      return {
        ...state,
        status: action.payload
      };
    },
    errorUser(state) {
      return {
        ...state,
        status: ERROR_ON_LOGIN
      };
    }
  }
});

export const { storeUser, errorUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
