import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { login, logout, refresh, updateSpecialties } from '../_actions/user.actions';

export type AuthenticationState = {
  loggedIn: boolean;
  user?: User;
};

const initialState: AuthenticationState = {
  loggedIn: false
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.user = null;
        state.loggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
      })
      .addCase(updateSpecialties.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
  reducers: {
  },
});


export default authenticationSlice.reducer;