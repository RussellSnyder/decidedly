import { createSlice } from '@reduxjs/toolkit';

export const currentUserInitialState = {
  isSignedIn: false,
  id: null,
  email: null,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: currentUserInitialState,
  reducers: {
    logInUser(state, action) {
      const { id, email, isVerified } = action.payload

      state.id = id;
      state.email = email;
      state.isVerified = isVerified;
      state.isSignedIn = true;
    },
    logOutUser(state) {
      Object.entries(currentUserInitialState).forEach(([key, value]) => {
        state[key] = value
      })
      state.isVerified = false;
    },
  },
});

export const {
  logInUser,
  logOutUser,
} = currentUserSlice.actions;

export const selectCurrentUser = state => state.currentUser;

export default currentUserSlice.reducer;